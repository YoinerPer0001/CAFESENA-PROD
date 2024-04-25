import express from "express";
import {getFacturas, getFacturasxId, createFactura, updateFactura, deleteFactura} from "../../controllers/factura.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { AdminEmplPermissions, adminPermiso } from '../../middlewares/managePermissions.js'
import { validateCreate, validateUpdate } from "../../validators/facturas.validator.js";
const routesFacturas = express();

routesFacturas.get('/api/v1/invoices',verifyToken,AdminEmplPermissions,getFacturas );

routesFacturas.get('/api/v1/invoices/:id',verifyToken,AdminEmplPermissions, getFacturasxId );

// routesFacturas.get('/api/v1/invoices/users/:id',verifyToken, getFacturasxUser );

routesFacturas.post('/api/v1/invoices/create',verifyToken, validateCreate, createFactura)

routesFacturas.put('/api/v1/invoices/update/:id',verifyToken,validateUpdate, AdminEmplPermissions, updateFactura)

routesFacturas.delete('/api/v1/invoices/delete/:id',verifyToken, adminPermiso, deleteFactura)

export default routesFacturas;

