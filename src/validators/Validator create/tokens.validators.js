import { check } from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";

const validateTokenCreate = [
    check("Token").exists().not().isDate(),
    check("Fec_Caducidad").exists().not().isDate(),
    check("User_Id_FK").exists().not().isString(),
    check("Tipo_token").exists().not().isString(),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export default validateTokenCreate;