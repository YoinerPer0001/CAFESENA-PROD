import { check } from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";


const validateUserCreate =[
    
    check('Nom_User').exists().not().isEmpty().isString(),
    check('Ape_User').exists().not().isEmpty().isString(),
    check('Ema_User').exists().not().isEmpty().isEmail(),
    check('Pass_User').exists().not().isEmpty().isString().isLength({ min: 8 }),
    check('Dir_Ip').exists().not().isEmpty().isString(),

    (req,res,next)=>{
        validateResult(req,res,next);
    }
]

export default validateUserCreate;
