import express from 'express';
import {getAllProvxProd, getAllProdxProv, createProvProd, updateProvProd } from '../../controllers/proveedor_productos.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { validateCreate, validateUpdate } from '../../validators/proveedores_productos.validator.js';
import { AdminEmplPermissions, adminPermiso } from '../../middlewares/managePermissions.js'

const routesProvProd = express();

routesProvProd.get('/api/v1/providers/products/:id', verifyToken,AdminEmplPermissions, getAllProvxProd)

routesProvProd.get('/api/v1/products/providers/:id', verifyToken,AdminEmplPermissions, getAllProdxProv)

routesProvProd.post('/api/v1/providers/products/create',validateCreate, verifyToken,adminPermiso, createProvProd)

routesProvProd.put('/api/v1/providers/products/update/:id', validateUpdate, verifyToken,adminPermiso, updateProvProd)


export default routesProvProd;
