import { QueryResult } from "pg";
import connectionDb from "../config/database.js"
import { CreateUser, User } from "../protocols/protocols.js";

async function create({ name, email, password }: CreateUser): Promise<QueryResult> {
  return await connectionDb.query(
    `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3);
    `,
    [name, email, password]
  );
}

async function findByEmail({ email }: Omit<User, "id" | "name" | "password">): Promise<QueryResult<User>> {
  return await connectionDb.query(
    `
      SELECT * FROM users WHERE email = $1;
    `,
    [email]
  );
}

async function findById({ id }: Omit<User, "name" | "email" | "password">): Promise<QueryResult<User>> {
  return await connectionDb.query(
    `
      SELECT * FROM users WHERE id = $1;
    `,
    [id]
  );
}

export default {
  create,
  findByEmail,
  findById,
}