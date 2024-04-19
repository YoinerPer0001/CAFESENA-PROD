import {GetInventarios, UpdateInventarios, createInventario, deleteInv} from '../../controllers/inventario.controller.js'
import express from "express";
import { verifyToken } from '../../middlewares/verifyToken.js'
import {validateCreate, validateUpdate} from '../../validators/inventario.validators.js';

const routesInventario = express();

routesInventario.get('/api/v1/inventarios', GetInventarios)
routesInventario.post('/api/v1/inventarios/create',validateCreate,verifyToken, createInventario)
routesInventario.put('/api/v1/inventarios/update/:id',validateUpdate,verifyToken, UpdateInventarios)
routesInventario.delete('/api/v1/inventarios/delete/:id',verifyToken, deleteInv)
export default routesInventario;