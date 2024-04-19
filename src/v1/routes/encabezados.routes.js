import express from "express";
import {GetAll, GetxType, UpdateEncabezado, createEncabezado} from "../../controllers/encabezado.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { AdminEmplPermissions } from '../../middlewares/managePermissions.js'
const routesEncabezados = express();

routesEncabezados.get('/api/v1/headers',verifyToken,AdminEmplPermissions,GetAll)

routesEncabezados.get('/api/v1/headers/:type',verifyToken,AdminEmplPermissions, GetxType)

routesEncabezados.post('/api/v1/headers/create', verifyToken,createEncabezado)

routesEncabezados.put('/api/v1/headers/update', verifyToken,UpdateEncabezado)

export default routesEncabezados;
