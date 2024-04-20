import express from "express";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { GetDet, GetDetxId,GetDetxIdHeader, createDet , UpdateDetalle} from "../../controllers/detalles.controller.js";
import { AdminEmplPermissions } from '../../middlewares/managePermissions.js'
import { validateCreate, validateUpdate } from "../../validators/detalles.validators.js";
const routesDetalles = express();

routesDetalles.get('/api/v1/details', verifyToken,AdminEmplPermissions, GetDet )

routesDetalles.get('/api/v1/details/:id', verifyToken, GetDetxId )

routesDetalles.get('/api/v1/details/headers/:id', verifyToken, GetDetxIdHeader )

routesDetalles.post('/api/v1/details/create', verifyToken, validateCreate, AdminEmplPermissions, createDet )

routesDetalles.put('/api/v1/details/update/:id', verifyToken, validateUpdate, AdminEmplPermissions, UpdateDetalle )

export default routesDetalles;
