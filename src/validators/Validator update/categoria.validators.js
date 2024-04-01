import {check} from "express-validator";
import { validateResult } from "../../utils/validators.utils.js";


const validateCategoriaUpdate =[
    check('Nom_Cat').optional().isString().not().isEmpty(),

    (req,res,next) => {
        validateResult(req, res, next);
    }
]

export default validateCategoriaUpdate;