import {check} from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";


const validateCategoriaCreate =[
    check('Nom_Cat').exists().not().isEmpty().isString(),

    (req,res,next) => {
        validateResult(req, res, next);
    }
]

export default validateCategoriaCreate;