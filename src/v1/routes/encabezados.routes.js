import express from "express";
import {GetxType, createEncabezado} from "../../controllers/encabezado.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
const routesEncabezados = express();

routesEncabezados.get('/api/v1/encabezados/:type', GetxType)

routesEncabezados.post('/api/v1/encabezado/create', verifyToken,createEncabezado)


export default routesEncabezados;
