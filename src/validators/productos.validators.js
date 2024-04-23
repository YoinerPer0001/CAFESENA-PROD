import { check } from "express-validator";
import { validateResult } from "../utils/validators.utils.js";


export const validateCreate = [
    check('PROD_COD').exists().withMessage('PROD_COD is required').not().isEmpty().withMessage('PROD_COD cannot be empty').isString().withMessage('PROD_COD must be a string'),
    check('PROD_NOM').exists().withMessage('PROD_NOM is required').not().isEmpty().withMessage('PROD_NOM cannot be empty').isString().withMessage('PROD_NOM must be a string'),
    check('PROD_DESC').exists().withMessage('PROD_DESC is required').not().isEmpty().withMessage('PROD_DESC cannot be empty').isString().withMessage('PROD_DESC must be a string'),
    check('PROD_PREC').exists().withMessage('PROD_PREC is required').not().isEmpty().withMessage('PROD_PREC cannot be empty').isDecimal().withMessage('PROD_PREC must be a decimal number'),
    check('CAT_ID_FK').exists().withMessage('CAT_ID_FK is required').not().isEmpty().withMessage('CAT_ID_FK cannot be empty').isString().withMessage('CAT_ID_FK must be a string value'),
    check('ID_LOTE').exists().withMessage('ID_LOTE is required').not().isEmpty().withMessage('ID_LOTE cannot be empty').isString().withMessage('ID_LOTE must be a string'),
    check('INV_ID').exists().withMessage('INV_ID is required').not().isEmpty().withMessage('INV_ID cannot be empty').isString().withMessage('INV_ID must be a string'),
    check('ID_PROV').exists().withMessage('ID_PROV is required').not().isEmpty().withMessage('ID_PROV cannot be empty').isString().withMessage('ID_PROV must be a string'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export const validateUpdate = [
    check('PROD_COD').optional().isString().withMessage('PROD_COD must be a string'),
    check('PROD_NOM').optional().isString().withMessage('PROD_NOM must be a string'),
    check('PROD_DESC').optional().isString().withMessage('PROD_DESC must be a string'),
    check('PROD_PREC').optional().isDecimal().withMessage('PROD_PREC must be a decimal number'),
    check('CAT_ID_FK').optional().isString().withMessage('CAT_ID_FK must be a string value'),
    check('ESTADO_REGISTRO').optional().isString().withMessage('PROD_DESC must be a string')
    .isLength({max:1}).withMessage('PROD_DESC must be 1 character long'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

