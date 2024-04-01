import {check} from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";

const validateProveedorCreate =[
    check("PROV_NOM").exists().not().isEmpy().isString(),
    check("PROV_CONTACTO").exists().not().isEmpy().isDate(),
    check("PROV_EST").exists().not().isEmpy().isDate(),
    
    (req, res, next) =>{
        validateResult(req, res, next);
    }
]

export default validateProveedorCreate;