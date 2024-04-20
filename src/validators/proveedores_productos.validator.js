import { check } from "express-validator";
import { validateResult } from "../utils/validators.utils.js";

export const validateCreate = [
    check("Id_Prov").exists().withMessage("Id_Prov is required")
        .not().isEmpty().withMessage("Id_Prov cannot be empty")
        .isString().withMessage("Id_Prov must be a string"),
    check("Id_Prod").exists().withMessage("Id_Prod is required")
        .not().isEmpty().withMessage("Id_Prod cannot be empty")
        .isString().withMessage("Id_Prod must be a string"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export const validateUpdate = [
    check("Id_Prov").optional()
        .not().isEmpty().withMessage("Id_Prov cannot be empty")
        .isString().withMessage("Id_Prov must be a string"),
    check("Id_Prod").optional()
        .not().isEmpty().withMessage("Id_Prod cannot be empty")
        .isString().withMessage("Id_Prod must be a string"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

