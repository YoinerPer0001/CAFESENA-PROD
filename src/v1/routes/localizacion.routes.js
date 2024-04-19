import express from 'express'
import { verifyToken } from "../../middlewares/verifyToken.js";
import { GetLocations, createLocations,UpdateLocations,GetLocationsxUser } from '../../controllers/localizacion.controller.js';
import {validateCreate,validateUpdate} from '../../validators/localizacion.validators.js';
import { adminPermiso } from '../../middlewares/managePermissions.js'
const routesLocation = express();
//all ok

routesLocation.get('/api/v1/localizaciones', verifyToken,adminPermiso, GetLocations)

routesLocation.get('/api/v1/localizaciones/user/:id',verifyToken,adminPermiso,GetLocationsxUser)

routesLocation.post('/api/v1/localizaciones/create',validateCreate, verifyToken,adminPermiso, createLocations)

routesLocation.put('/api/v1/localizaciones/update/:id',validateUpdate, verifyToken,adminPermiso, UpdateLocations)

export default routesLocation;