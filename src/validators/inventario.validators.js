import { check } from "express-validator";
import { validateResult } from "../utils/validators.utils.js";


export const validateCreate = [
    check('CANT_TOTAL').exists().withMessage('PROD_CANT is required').not().isEmpty().withMessage('PROD_CANT cannot be empty').isNumeric().withMessage('PROD_CANT must be a numeric value'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export const validateUpdate = [
    check('CANT_TOTAL').optional().not().isEmpty().withMessage('PROD_CANT cannot be empty').isNumeric().withMessage('PROD_CANT must be a numeric value'),
    check('INV_EST').optional().not().isEmpty().withMessage('INV_EST cannot be empty').isString().withMessage('INV_EST must be a string value').isLength({ max: 1 }).withMessage('INV_EST must be 1 length (S:stok, A:Agotado, R:Reservado)'),
    check('ESTADO_REGISTRO').optional().isString().withMessage('PROD_DESC must be a string')
    .isLength({ max: 1 }).withMessage('PROD_DESC must be 1 character long'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]
