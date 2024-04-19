import {check} from "express-validator";
import { validateResult } from "../utils/validators.utils.js";

export const validateCreate = [
    check("PROV_NOM").exists().withMessage("PROV_NOM is required").not().isEmpty().withMessage("PROV_NOM cannot be empty").isString().withMessage("PROV_NOM must be a string"),
    check("PROV_CONTACTO").exists().withMessage("PROV_CONTACTO is required").not().isEmpty().withMessage("PROV_CONTACTO cannot be empty").isString().withMessage("PROV_CONTACTO must  be a string"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export const validateUpdate = [
    check("PROV_NOM").optional().isString().withMessage("PROV_NOM must be a string"),
    check("PROV_CONTACTO").optional().isString().withMessage("PROV_CONTACTO must  be a string"),
    check("PROV_EST").optional().isString().withMessage("PROV_EST must  be a string"),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

