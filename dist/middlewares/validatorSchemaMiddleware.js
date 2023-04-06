import errorsCategory from "../errors/index.js";
export function validateSchema(schema) {
    return function (req, res, next) {
        var error = schema.validate(req.body, { abortEarly: false }).error;
        if (error) {
            var errors = error.details.map(function (detail) { return detail.message; });
            return res.status(400).send(errorsCategory.invalidDataError(errors));
        }
        next();
    };
}
