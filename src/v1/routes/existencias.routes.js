import express from "express";
import {getAll, getlote, deleteStock, updateStock} from "../../controllers/existencias.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { AdminEmplPermissions, adminPermiso } from '../../middlewares/managePermissions.js'
import { validateUpdate } from "../../validators/existencias.validar.js";
// import { validateCreate, validateUpdate } from "../../validators/encabezado.validator.js";

const routesExist = express();

routesExist.get('/api/v1/inventories/exists/all',verifyToken, AdminEmplPermissions,getAll)

routesExist.get('/api/v1/inventories/exists/lote/:id',verifyToken, AdminEmplPermissions, getlote)

routesExist.delete('/api/v1/inventories/exists/delete/:id',verifyToken, adminPermiso, deleteStock)

routesExist.put('/api/v1/inventories/exists/update/:id',validateUpdate,verifyToken, adminPermiso, updateStock)
export default routesExist;