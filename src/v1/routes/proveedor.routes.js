// proveedor.routes.js
import express from 'express';
import { getProveedor, createProveedor,UpdateProveedor } from '../../controllers/proveedor.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import validateProveedorUpdate from '../../validators/Validator update/proveedor.validators.js';

const routesProveedor = express.Router();

routesProveedor.get('/api/v1/proveedor',verifyToken, getProveedor);
routesProveedor.post('/api/v1/proveedor/create',verifyToken, createProveedor);
routesProveedor.put('/api/v1/proveedor/update/:id',validateProveedorUpdate,verifyToken, UpdateProveedor);

export default routesProveedor;