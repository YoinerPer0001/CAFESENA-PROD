import { check } from "express-validator";
import { validateResult } from "../utils/validators.utils.js";


export const validateCreate = [
    check('PROD_CANT').exists().withMessage('PROD_CANT is required').not().isEmpty().withMessage('PROD_CANT cannot be empty').isNumeric().withMessage('PROD_CANT must be a numeric value'),
    check('PROD_ID_FK').exists().withMessage('PROD_ID_FK is required').not().isEmpty().withMessage('PROD_ID_FK cannot be empty').isNumeric().withMessage('PROD_ID_FK must be a numeric value'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export const validateUpdate = [
    check('PROD_CANT').optional().not().isEmpty().withMessage('PROD_CANT cannot be empty').isNumeric().withMessage('PROD_CANT must be a numeric value'),
    check('PROD_ID_FK').optional().not().isEmpty().withMessage('PROD_ID_FK cannot be empty').isNumeric().withMessage('PROD_ID_FK must be a numeric value'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]
