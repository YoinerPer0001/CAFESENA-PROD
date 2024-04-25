import express from "express";
import {GetAll, GetxType, UpdateEncabezado, createEncabezado, GetxUser, deleteEncabezado} from "../../controllers/encabezado.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { AdminEmplPermissions, adminPermiso } from '../../middlewares/managePermissions.js'
import { validateCreate, validateUpdate } from "../../validators/encabezado.validator.js";
const routesEncabezados = express();

routesEncabezados.get('/api/v1/headers',verifyToken,AdminEmplPermissions,GetAll)

routesEncabezados.get('/api/v1/headers/type/:type',verifyToken, GetxType)

routesEncabezados.get('/api/v1/headers/user/:id/type/:type',verifyToken,GetxUser)

routesEncabezados.post('/api/v1/headers/create',validateCreate, verifyToken,AdminEmplPermissions,createEncabezado)

routesEncabezados.put('/api/v1/headers/update/:id',validateUpdate, verifyToken,AdminEmplPermissions,UpdateEncabezado)

routesEncabezados.delete('/api/v1/headers/delete/:id',verifyToken, adminPermiso, deleteEncabezado)

export default routesEncabezados;
