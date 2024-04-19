import express from 'express';
import { GetProductos, createProducts, GetProductosId, updateProductos } from '../../controllers/producto.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { validateCreate, validateUpdate } from "../../validators/productos.validators.js"
import { AdminEmplPermissions } from '../../middlewares/managePermissions.js'

const routesProductos = express();


routesProductos.get('/api/v1/products', GetProductos);


routesProductos.get('/api/v1/products/:id', GetProductosId);


routesProductos.post('/api/v1/products/create', validateCreate, verifyToken, AdminEmplPermissions, createProducts);


routesProductos.put('/api/v1/products/update/:id', validateUpdate, verifyToken, AdminEmplPermissions, updateProductos);

export default routesProductos;