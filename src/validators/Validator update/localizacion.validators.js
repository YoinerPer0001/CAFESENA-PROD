import { check } from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";


const validateLocalizacionUpdate =[
    
    check('Dir_Ip').optional().not().isString(),
    check('Id_User_FK').optional().not().isNumeric(),

    (req,res,next)=>{
        validateResult(req,res,next);
    }
]

export default validateLocalizacionUpdate;
