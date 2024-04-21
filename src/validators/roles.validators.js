import { check } from "express-validator";
import { validateResult } from "../utils/validators.utils.js";

export const validateCreate = [
    check("Nom_Rol").exists().withMessage("Nom_Rol is required").isString().withMessage("Nom_Rol must be a string"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export const validateUpdate = [
    check("Nom_Rol").optional().isString().withMessage("Nom_Rol must  be a string"),
    check('ESTADO_REGISTRO').optional().isString().withMessage('PROD_DESC must be a string')
    .isLength({max:1}).withMessage('PROD_DESC must be 1 character long'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]
