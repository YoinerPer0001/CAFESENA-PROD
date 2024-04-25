import { check } from "express-validator";
import { validateResult } from "../utils/validators.utils.js";

export const validateLoteCreate = [
    check('COD_LOTE').exists().withMessage('COD_LOTE is required').not().isEmpty().withMessage('COD_LOTE cannot be empty').isString().withMessage('COD_LOTE must be a string value'),
    check('FEC_REC').exists().withMessage('FEC_REC is required').isString().withMessage('FEC_REC must be a string')
        .not().isEmpty().withMessage('FEC_REC cannot be empty')
        .isISO8601().toDate().withMessage('FEC_REC must be a date'),
    check('FEC_VENC').exists().withMessage('FEC_VENC is required').isString().withMessage('FEC_VENC must be a string')
        .not().isEmpty().withMessage('FEC_VENC cannot be empty')
        .isISO8601().toDate().withMessage('FEC_VENC must be a date'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export const validateLoteUpdate = [
    check('COD_LOTE').optional().not().isEmpty().withMessage('COD_LOTE cannot be empty').isString().withMessage('COD_LOTE must be a string value'),
    check('FEC_REC').optional().isString().withMessage('FEC_REC must be a string')
        .not().isEmpty().withMessage('FEC_REC cannot be empty')
        .isISO8601().toDate().withMessage('FEC_REC must be a date'),
    check('FEC_VENC').optional().isString().withMessage('FEC_VENC must be a string')
        .not().isEmpty().withMessage('FEC_VENC cannot be empty')
        .isISO8601().toDate().withMessage('FEC_VENC must be a date'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]