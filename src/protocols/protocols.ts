export type ApplicationError = {
  name: string,
  message: string,
}

export type AplicationInvalidDataError = ApplicationError & {
  details: string []
} 