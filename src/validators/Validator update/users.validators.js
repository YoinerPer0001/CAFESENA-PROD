import { check } from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";


const validateUserUpdate =[
    
    check('Nom_User').optional().not().isEmpty().isString(),
    check('Ape_User').optional().not().isEmpty().isString(),
    check('Ema_User').optional().not().isEmpty().isEmail(),
    check('Pass_User').optional().not().isEmpty().isString().isLength({ min: 8 }),
    check('Dir_Ip').optional().not().isEmpty().isString(),

    (req,res,next)=>{
        validateResult(req,res,next);
    }
]

export default validateUserUpdate;
