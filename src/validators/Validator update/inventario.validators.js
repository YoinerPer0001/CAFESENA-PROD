import { check } from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";


const validateInventarioUpdate =[
    check('PROD_CANT').optional().not().isNumeric(),
    check('PROD_ID_FK').optional().not().isNumeric(),

    (req,res,next)=>{
        validateResult(req,res,next);
    }
]

export default validateInventarioUpdate;
