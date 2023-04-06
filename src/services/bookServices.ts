import errorsCategory from "../errors/index.js";
import { CreateBook, CreateMyBook } from "../protocols/protocols";
import bookRepositories from "../repositories/bookRepositories.js";

async function create({ name, author, userId } : CreateBook) {
  const {rowCount} = await bookRepositories.findByName({name});
  if (rowCount) throw errorsCategory.conflictError("Book already exists");

  await bookRepositories.create({name, author, userId});
}

async function findAll() {
  const books = await bookRepositories.findAll();
  if (!books.rowCount) throw errorsCategory.notFoundError();
  return books.rows;
}

async function takeBook({userId, bookId}: CreateMyBook) {
  const { rows: [book] } = await bookRepositories.findById({bookId});
  if (!book) throw errorsCategory.notFoundError();
  if(!book.available) throw errorsCategory.conflictError("Book not available");

  await bookRepositories.updateStatusBook({status: true, bookId});
  await bookRepositories.takeBook({userId,bookId});
}

async function findAllMyBooks({userId}: Omit<CreateMyBook, "bookId">) {
  const books = await bookRepositories.findAllMyBooks({userId});
  return books.rows;
}

export default{
  create,
  findAll,
  takeBook,
  findAllMyBooks,
}