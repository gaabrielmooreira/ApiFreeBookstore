function conflictError(message) {
    return {
        name: "ConflictError",
        message: message
    };
}
function duplicatedEmailError() {
    return {
        name: "DuplicatedEmailError",
        message: "Email is already in use."
    };
}
function unauthorizedError() {
    return {
        name: "UnauthorizedError",
        message: "You must be signed in to continue"
    };
}
function notFoundError() {
    return {
        name: "NotFoundError",
        message: "No result for this search!"
    };
}
function invalidCredentialsError() {
    return {
        name: "InvalidCredentialsError",
        message: "Email or password are incorrect."
    };
}
function invalidDataError(details) {
    return {
        name: "InvalidDataError",
        message: "Invalid data",
        details: details
    };
}
export default {
    conflictError: conflictError,
    duplicatedEmailError: duplicatedEmailError,
    unauthorizedError: unauthorizedError,
    notFoundError: notFoundError,
    invalidCredentialsError: invalidCredentialsError,
    invalidDataError: invalidDataError
};
