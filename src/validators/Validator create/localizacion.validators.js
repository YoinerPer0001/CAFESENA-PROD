import { check } from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";


const validateLocalizacionCreate =[
    
    check('Dir_Ip').exists().not().isEmpty().isString(),
    check('Id_User_FK').exists().not().isEmpty().isNumeric(),

    (req,res,next)=>{
        validateResult(req,res,next);
    }
]

export default validateLocalizacionCreate;
