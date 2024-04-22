import express from "express";
import {createCompra_Venta, GetxType, GetxUser} from "../../controllers/compras_ventas.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { AdminEmplPermissions, adminPermiso } from '../../middlewares/managePermissions.js'
import { validateCreate, validateUpdate } from "../../validators/compra_ventas.validator.js";


const compras_ventasroutes = express();

compras_ventasroutes.get('/api/v1/buy/sales/type/:type', verifyToken,GetxType)

compras_ventasroutes.get('/api/v1/buy/sales/user/:id/type/:type', verifyToken, GetxUser)

compras_ventasroutes.post('/api/v1/buy/sales/create', validateCreate, verifyToken, AdminEmplPermissions, createCompra_Venta )



export default compras_ventasroutes;