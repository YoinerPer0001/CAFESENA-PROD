import { check } from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";

const validateRolesUpdate = [

    check("Nom_Rol").optional().not().isString(),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export default validateRolesUpdate;