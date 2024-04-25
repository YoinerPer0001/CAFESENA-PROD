import { check } from "express-validator";
import { validateResult } from "../utils/validators.utils.js";


export const validateCreate = [
    check('MET_PAGO')
        .exists().not().isEmpty().withMessage('MET_PAGO is required')
        .isString().withMessage('MET_PAGO must be a string')
        .isLength({ max: 1 }).withMessage('MET_PAGO must be 1 character long'),
    check('TOTAL')
        .exists().not().isEmpty().withMessage('TOTAL is required')
        .isDecimal().withMessage('TOTAL must be a Decimal'),
    check('ID_USER')
        .exists().not().isNumeric().withMessage('ID_USER must be a non-numeric string'),
    check('TIPO_ENCABE')
        .exists().not().isEmpty().withMessage('TIPO_ENCABE is required')
        .isString().withMessage('TIPO_ENCABE must be a string'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateUpdate = [
    check('CANT_PROD')
        .optional().not().isEmpty().withMessage('CANT_PROD is required')
        .isNumeric().withMessage('CANT_PROD must be a Decimal'),
    check('PRO_ID')
        .optional().isString().withMessage('PRO_ID must be a non-numeric string'),
    check('INV_ID')
        .optional().isString().withMessage('INV_ID must be a non-numeric string'),
    check('LOTE_ID')
        .optional().isString().withMessage('LOTE_ID must be a non-numeric string'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];
