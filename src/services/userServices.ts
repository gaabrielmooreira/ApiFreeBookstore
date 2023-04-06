import jwt from 'jsonwebtoken';
import userRepositories from '../repositories/userRepositories.js';
import errorsCategory from '../errors/index.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { CreateUser, SignInUser } from '../protocols/protocols.js';
dotenv.config();

async function create({ name, email, password }: CreateUser) {
  const {rowCount} = await userRepositories.findByEmail({ email });
  if (rowCount) throw errorsCategory.duplicatedEmailError();

  const hashPassword: string = await bcrypt.hash(password, 10);
  await userRepositories.create({ name, email, password: hashPassword });
}

async function signIn({ email, password }: SignInUser) {
  const { rows: [user] } = await userRepositories.findByEmail({ email });
  if (!user) throw errorsCategory.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errorsCategory.invalidCredentialsError();

  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
  return token;
}

export default {
  create,
  signIn
}