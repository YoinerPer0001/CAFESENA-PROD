import { check } from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";


const validateProductosCreate =[
    
    check('PROD_COD').exists().not().isEmpty().isString(),
    check('PROD_NOM').exists().not().isEmpty().isString(),
    check('PROD_DESC').exists().not().isEmpty().isString(),
    check('PROD_PREC').exists().not().isEmpty().isDecimal(),
    check('CAT_ID_FK').exists().not().isEmpty().isNumeric(),

    (req,res,next)=>{
        validateResult(req,res,next);
    }
]

export default validateProductosCreate;
