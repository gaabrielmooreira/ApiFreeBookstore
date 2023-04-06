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

export type AuthenticatedRequest = Request & JWTPayload;