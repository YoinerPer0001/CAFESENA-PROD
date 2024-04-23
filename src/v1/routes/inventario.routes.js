import {GetInventarios, UpdateInventarios, createInventario, GetInventarioxId, deleteInv} from '../../controllers/inventario.controller.js'
import express from "express";
import { verifyToken } from '../../middlewares/verifyToken.js'
import {validateCreate, validateUpdate} from '../../validators/inventario.validators.js';
import { AdminEmplPermissions, adminPermiso } from '../../middlewares/managePermissions.js'
const routesInventario = express();

routesInventario.get('/api/v1/inventories', verifyToken,AdminEmplPermissions, GetInventarios)
routesInventario.get('/api/v1/inventories/:id', verifyToken,AdminEmplPermissions, GetInventarioxId)
// routesInventario.get('/api/v1/inventories/lote/:lote', verifyToken,AdminEmplPermissions, GetInventarioxLote)
routesInventario.post('/api/v1/inventories/create',validateCreate,verifyToken, AdminEmplPermissions, createInventario)
routesInventario.put('/api/v1/inventories/update/:id',validateUpdate,verifyToken, AdminEmplPermissions, UpdateInventarios)
routesInventario.delete('/api/v1/inventories/delete/:id',verifyToken,adminPermiso, deleteInv)
export default routesInventario;