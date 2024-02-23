import { body, validationResult } from "express-validator";
export const Validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty())
                break;
        }
        const errors = validationResult(req);
        if (errors.isEmpty())
            return next();
        res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];
export const signupValidator = [
    body("firstname").notEmpty().withMessage("Firstname is required"),
    body("firstname").isLength({ max: 32 }).withMessage("Firstname must be at most 32 characters long"),
    body("lastname").isLength({ max: 32 }).withMessage("Lastname must be at most 32 characters long"),
    ...loginValidator,
];
//# sourceMappingURL=validator.js.map