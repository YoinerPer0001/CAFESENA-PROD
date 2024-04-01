import { check } from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";

const validateTokenUpdate = [
    check("Token").optional().not().isString(),
    check("Fec_Caducidad").optional().not().isDate(),
    check("User_Id_FK").optional().not().isString(),
    check("Tipo_token").optional().not().isString(),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export default validateTokenUpdate;