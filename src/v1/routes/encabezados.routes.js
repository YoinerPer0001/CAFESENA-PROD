import express from "express";
import {GetAll, GetxType, UpdateEncabezado, createEncabezado} from "../../controllers/encabezado.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
const routesEncabezados = express();

routesEncabezados.get('/api/v1/encabezados',verifyToken,GetAll)

routesEncabezados.get('/api/v1/encabezados/:type',verifyToken, GetxType)

routesEncabezados.post('/api/v1/encabezado/create', verifyToken,createEncabezado)

routesEncabezados.put('/api/v1/encabezado/update', verifyToken,UpdateEncabezado)

export default routesEncabezados;
