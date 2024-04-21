import { check } from "express-validator";
import { validateResult } from "../utils/validators.utils.js";


export const validateCreate = [
    check('Id_Enc').exists()
        .not().isEmpty().withMessage('Id_Enc cannot be empty')
        .isString().withMessage('Id_Enc must be a string'),
    check('Id_Prod').exists()
        .not().isEmpty().withMessage('Id_Prod cannot be empty')
        .isString().withMessage('Id_Prod must be a string'),
    check('cantidad').exists()
        .isNumeric().withMessage('cantidad must be a number'),
    check('Precio_U').exists()
        .isDecimal().withMessage('Precio_U must be decimal number'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateUpdate = [
    check('Id_Enc').optional()
        .not().isEmpty().withMessage('Id_Enc cannot be empty')
        .isString().withMessage('Id_Enc must be a string'),
    check('Id_Prod').optional().not().isEmpty().withMessage('Id_Prod cannot be empty')
        .isString().withMessage('Id_Prod must be a string'),
    check('cantidad').optional()
        .isNumeric().withMessage('cantidad must be numeric'),
    check('Precio_U').optional()
        .isNumeric().withMessage('Precio_U must be numeric'),
    check('ESTADO_REGISTRO').optional().isString().withMessage('PROD_DESC must be a string')
        .isLength({ max: 1 }).withMessage('PROD_DESC must be 1 character long'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];
