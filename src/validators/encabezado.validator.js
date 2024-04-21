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
    check('MET_PAGO')
        .optional().not().isEmpty().withMessage('MET_PAGO is required')
        .isString().withMessage('MET_PAGO must be a string')
        .isLength({ max: 1 }).withMessage('MET_PAGO must be 1 character long'),
    check('TOTAL')
        .optional().not().isEmpty().withMessage('TOTAL is required')
        .isDecimal().withMessage('TOTAL must be a Decimal')
        .isLength({ max: 10 }).withMessage('TOTAL must be 10 long decimal'),
    check('ID_USER')
        .optional().not().isNumeric().withMessage('ID_USER must be a non-numeric string'),
    check('TIPO_ENCABE')
        .optional().not().isEmpty().withMessage('TIPO_ENCABE is required')
        .isString().withMessage('TIPO_ENCABE must be a string')
        .isLength({ max: 1 }).withMessage('TIPO_ENCABE must be 1 character long'),
    check('FECH_ENC')
        .optional().not().isEmpty().withMessage('FECH_ENC is required')
        .isString().withMessage('FECH_ENC must be a string (date)'),
    check('ESTADO_REGISTRO').optional().isString().withMessage('PROD_DESC must be a string')
        .isLength({ max: 1 }).withMessage('PROD_DESC must be 1 character long'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];
