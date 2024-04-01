import { check } from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";

const validateRolesCreate = [

    check("Nom_Rol").exists().not().isString(),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export default validateRolesCreate;