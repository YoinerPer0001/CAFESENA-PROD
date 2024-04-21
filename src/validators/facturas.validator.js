import { check } from "express-validator";
import { validateResult } from "../utils/validators.utils.js";


export const validateCreate = [
    check('Id_Enc').exists().withMessage('Id_Enc is required')
        .not().isEmpty().withMessage('Id_Enc must not be empty')
        .isString().withMessage('Id_Enc must be a string'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export const validateUpdate = [
    check('FACT_FECH').optional().isString().withMessage('FACT_FECH must be a string')
        .not().isEmpty().withMessage('FACT_FECH cannot be empty')
        .isISO8601().toDate().withMessage('FACT_FECH must be a date'),
    check('ID_EMPLEADO').optional().isString().withMessage('ID_EMPLEADO must be a string')
        .not().isEmpty().withMessage('ID_EMPLEADO cannot be empty'),
    check('ESTADO_REGISTRO').optional().isString().withMessage('PROD_DESC must be a string')
        .isLength({ max: 1 }).withMessage('PROD_DESC must be 1 character long'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]