import { check } from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";


const validateProductosUpdate =[
    
    check('PROD_COD').optional().not().isString(),
    check('PROD_NOM').optional().not().isString(),
    check('PROD_DESC').optional().not().isString(),
    check('PROD_PREC').optional().not().isDecimal(),
    check('CAT_ID_FK').optional().not().isNumeric(),

    (req,res,next)=>{
        validateResult(req,res,next);
    }
]

export default validateProductosUpdate;
