import {check} from "express-validator";
import { validateResult } from "../utils/validators.utils.js";


export const validateCreate =[
    check('Id_Enc').exists().not().isEmpty().isString().withMessage('Id_Enc must be a string'),
    check('Id_Prod').exists().not().isEmpty().isString().withMessage('Id_Prod must be a string'),
    check('cantidad').exists().not().isNumeric().isString().withMessage('cantidad must be a number'),
    check('Precio_U').exists().not().isNumeric().isString().withMessage('Precio_U must be a number'),
    check('Prov_Id').exists().not().isEmpty().isString().withMessage('Prov_Id must be a string'),
    (req,res,next) => {
        validateResult(req, res, next);
    }
]

export const validateUpdate =[
    check('Id_Enc').optional().not().isEmpty().isString().withMessage('Id_Enc must be a string'),
    check('Id_Prod').optional().not().isEmpty().isString().withMessage('Id_Prod must be a string'),
    check('cantidad').optional().not().isNumeric().isString().withMessage('cantidad must be a number'),
    check('Precio_U').optional().not().isNumeric().isString().withMessage('Precio_U must be a number'),
    check('Prov_Id').optional().not().isEmpty().isString().withMessage('Prov_Id must be a string'),
    (req,res,next) => {
        validateResult(req, res, next);
    }
]