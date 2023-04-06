export function handleApplicationErrors(err, req, res, next) {
    if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
        return res
            .status(409)
            .send({ message: err.message });
    }
    if (err.name === "InvalidCredentialsError") {
        return res.status(401).send({
            message: err.message,
        });
    }
    if (err.name === "UnauthorizedError") {
        return res.status(401).send({
            message: err.message,
        });
    }
    if (err.name === "NotFoundError") {
        return res.status(404).send({
            message: err.message,
        });
    }
    return res.status(500).send({
        error: "InternalServerError",
        message: "Internal Server Error",
    });
}
