import { check } from "express-validator";
import { validateResult } from "../utils/validators.utils.js";

export const validateCreate = [
    check("Id_User").exists().withMessage("Id_User is required").isString().withMessage("Id_User must not be a string"),
    check("Tipo_token").exists().withMessage("Tipo_token is required").isString().withMessage("Tipo_token must not be a string"),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export const validateUpdate = [
    check("Id_User").optional().isString().withMessage("User_Id_FK must not be a string"),
    check("Tipo_token").optional().isString().withMessage("Tipo_token must not be a string"),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
]
