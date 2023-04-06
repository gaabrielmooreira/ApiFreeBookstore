import { Request } from "express"

export type ApplicationError = {
  name: string,
  message: string,
}

export type AplicationInvalidDataError = ApplicationError & {
  details: string []
} 

export type User = {
  id: number,
  name: string,
  email: string,
  password: string
}
export type CreateUser = Omit<User, "id">;
export type SignInUser = Omit<User, "id" | "name">;

export type JWTPayload = {
  userId: number
};

export type Book = {
  id: number,
  name: string,
  author: string,
  available: boolean,
  userId: number
}
export type ReqBodyCreateBook = Omit<Book, "id" | "userId" | "available">
export type CreateBook = Omit<Book, "id" | "available">;

export type MyBook = {
  id: number,
  userId: number,
  bookId: number
}
export type CreateMyBook = Omit<MyBook, "id">;

export type AuthenticatedRequest = Request & JWTPayload;