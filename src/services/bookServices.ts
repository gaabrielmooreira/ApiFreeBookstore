import errorsCategory from "../errors/index.js";
import { Book, CreateBook, CreateMyBook, MyBook } from "../protocols/protocols";
import bookRepositories from "../repositories/bookRepositories.js";

async function create({ name, author, userId } : CreateBook): Promise<void> {
  const {rowCount} = await bookRepositories.findByName({name});
  if (rowCount) throw errorsCategory.conflictError("Book already exists");

  await bookRepositories.create({name, author, userId});
}

async function findAll(): Promise<Book[]>  {
  const books = await bookRepositories.findAll();
  if (!books.rowCount) throw errorsCategory.notFoundError();
  return books.rows;
}

async function takeBook({userId, bookId}: CreateMyBook): Promise<void> {
  const { rows: [book] } = await bookRepositories.findById({bookId});
  if (!book) throw errorsCategory.notFoundError();
  if(!book.available) throw errorsCategory.conflictError("Book not available");

  await bookRepositories.updateStatusBook({status: true, bookId});
  await bookRepositories.takeBook({userId,bookId});
}

async function findAllMyBooks({userId}: Omit<CreateMyBook, "bookId">): Promise<MyBook[]> {
  const books = await bookRepositories.findAllMyBooks({userId});
  return books.rows;
}

export default{
  create,
  findAll,
  takeBook,
  findAllMyBooks,
}