// proveedor.routes.js
import express from 'express';
import { getProveedor, createProveedor, UpdateProveedor, getProveedorxId, deleteProveedor } from '../../controllers/proveedor.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { validateCreate, validateUpdate } from '../../validators/proveedor.validators.js';
import { AdminEmplPermissions , adminPermiso} from '../../middlewares/managePermissions.js'

const routesProveedor = express.Router();

routesProveedor.get('/api/v1/providers', verifyToken, AdminEmplPermissions, getProveedor);
routesProveedor.get('/api/v1/providers/:id', verifyToken, AdminEmplPermissions, getProveedorxId)
routesProveedor.post('/api/v1/providers/create', validateCreate, verifyToken, createProveedor);
routesProveedor.put('/api/v1/providers/update/:id', validateUpdate, verifyToken, UpdateProveedor);

routesProveedor.delete('/api/v1/providers/delete/:id', verifyToken, adminPermiso , deleteProveedor);

export default routesProveedor;