import { check } from "express-validator";
import { validateResult } from "../utils/validators.utils.js";


export const validateCreate = [

    check('Nom_User').exists().withMessage('Nom_User is required').not().isEmpty().withMessage('Nom_User cannot be empty').isString().withMessage('Nom_User must be a string'),
    check('Ape_User').exists().withMessage('Ape_User is required').not().isEmpty().withMessage('Ape_User cannot be empty').isString().withMessage('Ape_User must be a string'),
    check('Ema_User').exists().withMessage('Ema_User is required').not().isEmpty().withMessage('Ema_User cannot be empty').isEmail().withMessage('Ema_User must be a valid email address'),
    check('Pass_User').exists().withMessage('Pass_User is required').not().isEmpty().withMessage('Pass_User cannot be empty').isString().withMessage('Pass_User must be a string').isLength({ min: 8 }).withMessage('Pass_User must be at least 8 characters long'),
    check('Dir_Ip').exists().withMessage('Dir_Ip is required').not().isEmpty().withMessage('Dir_Ip cannot be empty').isString().withMessage('Dir_Ip must be a string'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export const validateUpdate = [

    check('Nom_User').optional().not().isEmpty().withMessage('Nom_User cannot be empty').isString().withMessage('Nom_User must be a string'),
    check('Tel_User').optional().not().isEmpty().withMessage('Tel_User cannot be empty').isString().withMessage('Tel_User must be a string').isLength({ max: 10 }).withMessage('Tel_User must be at least 10 characters'),
    check('Ape_User').optional().not().isEmpty().withMessage('Ape_User cannot be empty').isString().withMessage('Ape_User must be a string'),
    check('Ema_User').optional().not().isEmpty().withMessage('Ema_User cannot be empty').isEmail().withMessage('Ema_User must be a valid email address'),
    check('Pass_User').optional().not().isEmpty().withMessage('Pass_User cannot be empty').isString().withMessage('Pass_User must be a string').isLength({ min: 8 }).withMessage('Pass_User must be at least 8 characters long'),
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
    check('ESTADO_REGISTRO').optional().isString().withMessage('PROD_DESC must be a string')
        .isLength({ max: 1 }).withMessage('PROD_DESC must be 1 character long'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]


export const validateLogin = [
    check('Ema_User').exists().withMessage('Ema_User is required').not().isEmpty().withMessage('Ema_User cannot be empty').isEmail().withMessage('Ema_User must be a valid email address'),
    check('Pass_User').exists().withMessage('Pass_User is required').not().isEmpty().withMessage('Pass_User cannot be empty').isString().withMessage('Pass_User must be a string').isLength({ min: 8 }).withMessage('Pass_User must be at least 8 characters long'),
    check('Dir_Ip').exists().withMessage('Dir_Ip is required').not().isEmpty().withMessage('Dir_Ip cannot be empty').isString().withMessage('Dir_Ip must be a string'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export const validateEmail = [
    check('Id_User').exists().withMessage('Id_User is required').not().isEmpty().withMessage('Id_User cannot be empty').isString().withMessage('Id_User must be a string'),
    check('codigo').exists().withMessage('codigo is required').not().isEmpty().withMessage('codigo cannot be empty').isString().withMessage('codigo must be a string').isLength({ min: 6, max: 6 }).withMessage('codigo must be 6 characters long'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]


export const validateCodIp = [
    check('Id_User').exists().not().isEmpty().isString(),
    check('codigo').exists().not().isEmpty().isString().isLength({ min: 6, max: 6 }),
    check('Dir_Ip')
        .exists().withMessage('Dir_Ip is required')
        .not().isEmpty().withMessage('Dir_Ip cannot be empty')
        .isString().withMessage('Dir_Ip must be a string')
        .isLength({ max: 15 }).withMessage('Dir_Ip must be at most 15 characters long')
        .custom((value, { req }) => {
            if (value) {
                const valueSplit = value.split('.')
                if (valueSplit.length != 4) {
                    throw new Error('Ip not valid');
                } else {
                    return true;
                }
            }
        }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]


export const validatelogout = [
    check('token').exists().withMessage('token is required')
    .not().isEmpty().withMessage('token cannot be empty')
    .isString().withMessage('token must be a string'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]