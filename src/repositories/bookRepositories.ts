import { QueryResult } from "pg";
import connectionDb from "../config/database.js"
import { Book, CreateBook, CreateMyBook, MyBook } from "../protocols/protocols.js";

async function create({ name, author, userId }: CreateBook): Promise<QueryResult> {
  return await connectionDb.query(
    `
      INSERT INTO books (name, author, available, "userId")
      VALUES ($1, $2, $3, $4);
    `,
    [name, author, true, userId]
  )
}

async function findAll(): Promise<QueryResult<Book>> {
  return await connectionDb.query(
    `
    SELECT 
      b.id, b.name, b.author, b.available, 
      u.name as "createdBy"
    FROM books b
    JOIN users u
    ON b."userId" = u.id;
    `
  )
}

async function updateStatusBook({ status, bookId }: { status: boolean, bookId: number }): Promise<QueryResult> {
  return await connectionDb.query(
    `
      UPDATE books
      SET available = $1
      WHERE id = $2;
  `,
    [status, bookId]
  );
}

async function takeBook({ userId, bookId }: CreateMyBook): Promise<QueryResult> {
  return await connectionDb.query(
    `
      INSERT INTO "myBooks" ("userId", "bookId")
      VALUES ($1, $2);
    `,
    [userId, bookId]
  )
}

async function findAllMyBooks({ userId }: { userId: number}): Promise<QueryResult<MyBook>> {
  return await connectionDb.query(
    `
      SELECT 
        u.name as "user_name",
        b.name as "book_name",
        b.author as "book_author" 
      FROM "myBooks" m
      JOIN users u ON m."userId" = u.id
      JOIN books b ON m."bookId" = b.id
      WHERE m."userId" = $1
    `,
    [userId]
  )
}

async function findByName({ name }: { name: string }): Promise<QueryResult<Book>> {
  return await connectionDb.query(
    `
      SELECT * FROM books WHERE name = $1;
    `,
    [name]
  )
}

async function findById({ bookId }: { bookId: number }): Promise<QueryResult<Book>> {
  return await connectionDb.query(
    `
      SELECT * FROM books WHERE id = $1
    `,
    [bookId]
  );
}

export default {
  create,
  findAll,
  updateStatusBook,
  takeBook,
  findAllMyBooks,
  findByName,
  findById,
}