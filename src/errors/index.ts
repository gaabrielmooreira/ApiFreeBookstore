import { AplicationInvalidDataError, ApplicationError } from "../protocols/protocols.js"

function conflictError(message: string): ApplicationError {
  return {
    name: "ConflictError",
    message
  }
}

function duplicatedEmailError(): ApplicationError {
  return {
    name: "DuplicatedEmailError",
    message: "Email is already in use."
  }
}

function unauthorizedError(): ApplicationError {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue"
  }
}

function notFoundError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "No result for this search!"
  }
}

function invalidCredentialsError(): ApplicationError {
  return {
    name: "InvalidCredentialsError",
    message: "Email or password are incorrect."
  }
}

function invalidDataError(details: string[]): AplicationInvalidDataError {
  return {
    name: "InvalidDataError",
    message: "Invalid data",
    details
  }
}

export default {
  conflictError,
  duplicatedEmailError,
  unauthorizedError,
  notFoundError,
  invalidCredentialsError,
  invalidDataError
}