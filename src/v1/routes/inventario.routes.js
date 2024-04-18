import {GetInventarios, UpdateInventarios, createInventario, deleteInv} from '../../controllers/inventario.controller.js'
import express from "express";
import { verifyToken } from '../../middlewares/verifyToken.js'
import validateInventarioCreate from '../../validators/Validator create/inventario.validators.js';
import validateInventarioUpdate from '../../validators/Validator update/inventario.validators.js';
const routesInventario = express();

routesInventario.get('/api/v1/inventarios', GetInventarios)
routesInventario.post('/api/v1/inventarios/create',validateInventarioCreate,verifyToken, createInventario)
routesInventario.put('/api/v1/inventarios/update/:id',validateInventarioUpdate,verifyToken, UpdateInventarios)
routesInventario.delete('/api/v1/inventarios/delete/:id',verifyToken, deleteInv)
export default routesInventario;