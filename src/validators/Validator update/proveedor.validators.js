import {check} from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";

const validateProveedorUpdate =[
    check("PROV_NOM").optional().not().isString(),
    check("PROV_CONTACTO").optional().not().isDate(),
    check("PROV_EST").optional().not().isDate(),
    
    (req, res, next) =>{
        validateResult(req, res, next);
    }
]

export default validateProveedorUpdate;