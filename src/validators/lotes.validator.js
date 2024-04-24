import { check } from "express-validator";
import { validateResult } from "../utils/validators.utils.js";

export const validateLoteCreate = [
    check('COD_LOTE').exists().withMessage('COD_LOTE is required').not().isEmpty().withMessage('COD_LOTE cannot be empty').isString().withMessage('COD_LOTE must be a string value'),
    check('FEC_REC').exists().withMessage('FEC_REC is required').not().isEmpty().withMessage('FEC_REC cannot be empty').isDate().withMessage('FEC_REC must be a date value'),
    check('FEC_VENC').exists().withMessage('FEC_VENC is required').not().isEmpty().withMessage('FEC_VENC cannot be empty').isDate().withMessage('FEC_VENC must be a date value'),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export const validateLoteUpdate = [
    check('COD_LOTE').optional().not().isEmpty().withMessage('COD_LOTE cannot be empty').isString().withMessage('COD_LOTE must be a string value'),
    check('FEC_REC').optional().not().isEmpty().withMessage('FEC_REC cannot be empty').isDate().withMessage('FEC_REC must be a date value'),
    check('FEC_VENC').optional().not().isEmpty().withMessage('FEC_VENC cannot be empty').isDate().withMessage('FEC_VENC must be a date value'),
  
    (req, res, next) => {
        validateResult(req, res, next);
    }
]