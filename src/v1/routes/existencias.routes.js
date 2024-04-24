import express from "express";
import {getAll, getlote} from "../../controllers/existencias.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { AdminEmplPermissions, adminPermiso } from '../../middlewares/managePermissions.js'
// import { validateCreate, validateUpdate } from "../../validators/encabezado.validator.js";

const routesExist = express();

routesExist.get('/api/v1/inventories/exists/all',verifyToken, AdminEmplPermissions,getAll)

routesExist.get('/api/v1/inventories/exists/lote/:id',verifyToken, AdminEmplPermissions, getlote)


export default routesExist;