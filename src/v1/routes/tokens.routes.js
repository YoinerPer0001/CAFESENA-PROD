import express from 'express';
import {GetAllTokens, GetTokenssxUser,InsertToken, GetTokenssxTipo, UpdateTokens} from '../../controllers/tokens.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import {validateCreate,validateUpdate} from '../../validators/tokens.validators.js';
import { adminPermiso } from "../../middlewares/managePermissions.js";
const routesTokens = express();

//ALL OK


routesTokens.get('/api/v1/tokens', verifyToken,adminPermiso, GetAllTokens)

routesTokens.get('/api/v1/tokens/user/:id',verifyToken,adminPermiso, GetTokenssxUser)

routesTokens.get('/api/v1/tokens/type/:tipo',verifyToken, adminPermiso, GetTokenssxTipo)

routesTokens.post('/api/v1/tokens/create',validateCreate,verifyToken,adminPermiso, InsertToken);

routesTokens.put('/api/v1/tokens/update/:id',validateUpdate,verifyToken, adminPermiso, UpdateTokens)


export default routesTokens;