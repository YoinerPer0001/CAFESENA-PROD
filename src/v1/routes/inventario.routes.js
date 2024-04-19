import {GetInventarios, UpdateInventarios, createInventario, GetInventarioxId} from '../../controllers/inventario.controller.js'
import express from "express";
import { verifyToken } from '../../middlewares/verifyToken.js'
import {validateCreate, validateUpdate} from '../../validators/inventario.validators.js';
import { AdminEmplPermissions } from '../../middlewares/managePermissions.js'
const routesInventario = express();

routesInventario.get('/api/v1/inventories', verifyToken,AdminEmplPermissions, GetInventarios)
routesInventario.get('/api/v1/inventories/:id', verifyToken,AdminEmplPermissions, GetInventarioxId)
routesInventario.post('/api/v1/inventories/create',validateCreate,verifyToken, AdminEmplPermissions, createInventario)
routesInventario.put('/api/v1/inventories/update/:id',validateUpdate,verifyToken, AdminEmplPermissions, UpdateInventarios)
// routesInventario.delete('/api/v1/inventories/delete/:id',verifyToken, deleteInv)
export default routesInventario;