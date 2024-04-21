import { check } from "express-validator";
import { validateResult } from "../utils/validators.utils.js";


export const validateCreate = [
    check('Dir_Ip')
        .exists().withMessage('Dir_Ip is required')
        .not().isEmpty().withMessage('Dir_Ip cannot be empty')
        .isString().withMessage('Dir_Ip must be a string')
        .isLength({ min: 7, max: 15 }).withMessage('Dir_Ip must be at most 7 to 15 characters long')
        .custom((value, { req }) => {
            if (value) {
                const valueSplit = value.split('.')
                if (valueSplit.length != 4) {
                    throw new Error('Dir_Ip is not valid');
                } else {
                    return true;
                }
            }
        }),
    check('Id_User').exists().not().isEmpty().withMessage('Id_User is required').isString().withMessage('Id_User must be a string value'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export const validateUpdate = [
    check('Dir_Ip')
        .optional()
        .not().isEmpty().withMessage('Dir_Ip cannot be empty')
        .isString().withMessage('Dir_Ip must be a string')
        .isLength({ max: 15 }).withMessage('Dir_Ip must be at most 15 characters long')
        .custom((value, { req }) => {
            if (value) {
                const valueSplit = value.split('.')
                if (valueSplit.length != 4) {
                    throw new Error('Dir_Ip is not valid');
                } else {
                    return true;
                }
            }
        }),
    check('Id_User_FK').optional().not().isEmpty().withMessage('Id_User_FK cannot be empty').isNumeric().withMessage('Id_User_FK must be a numeric value'),
    check('ESTADO_REGISTRO').optional().isString().withMessage('PROD_DESC must be a string')
    .isLength({max:1}).withMessage('PROD_DESC must be 1 character long'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]
