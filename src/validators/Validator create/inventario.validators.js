import { check } from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";


const validateInventarioCreate =[
    check('PROD_CANT').exists().not().isEmpty().isNumeric(),
    check('PROD_ID_FK').exists().not().isEmpty().isNumeric(),

    (req,res,next)=>{
        validateResult(req,res,next);
    }
]

export default validateInventarioCreate;
