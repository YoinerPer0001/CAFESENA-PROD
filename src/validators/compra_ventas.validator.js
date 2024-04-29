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
        .exists().isString().withMessage('ID_USER must be a string'),
    check('TIPO_ENCABE')
        .exists().not().isEmpty().withMessage('TIPO_ENCABE is required')
        .isString().withMessage('TIPO_ENCABE must be a string')
        .isLength({ max: 1 }).withMessage('TIPO_ENCABE must be 1 character long'),
    check('LOTE_ID')
        .exists().not().isEmpty().withMessage('LOTE_ID is required')
        .isString().withMessage('LOTE_ID must be a string'),
    check('LISTA_PROD')
        .exists().not().isEmpty().withMessage('LISTA_PROD is required')
        .isArray().withMessage('LISTA_PROD must be an array')
        .custom((value, { req }) => {
            if (value) {
                for (const obj of value) {
                    if (!obj.ID_PROD || typeof obj.ID_PROD != 'string') {

                        throw new Error("ID_PROD is required and must be a string");

                    }else if(!obj.CANTIDAD || typeof obj.CANTIDAD != 'number') {

                        throw new Error("CANTIDAD is required and must be a number");

                    }else if(!obj.PRECIO_U || typeof obj.PRECIO_U != 'number') {

                        throw new Error("Precio_U is required and must be a number");
                    }
                }
            }
            // Si no se lanzó ninguna excepción, la validación fue exitosa
            return true;
        }),        
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
