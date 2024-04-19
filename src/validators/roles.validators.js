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

    (req, res, next) => {
        validateResult(req, res, next);
    }
]
