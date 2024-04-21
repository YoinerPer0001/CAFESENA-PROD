import express from 'express';
import {GetRoles,GetRolesxId, createRoles,UpdateRoles, deleteRol} from '../../controllers/roles.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import {validateCreate, validateUpdate} from '../../validators/roles.validators.js';
import { adminPermiso } from "../../middlewares/managePermissions.js";
const routesRoles = express();
//ALL OK

routesRoles.get('/api/v1/roles',verifyToken,adminPermiso, GetRoles);


routesRoles.get('/api/v1/roles/:id',verifyToken,adminPermiso, GetRolesxId);


routesRoles.post('/api/v1/roles/create',validateCreate,verifyToken, adminPermiso, createRoles);


routesRoles.put('/api/v1/roles/update/:id',validateUpdate,verifyToken, adminPermiso, UpdateRoles);

routesRoles.delete('/api/v1/roles/deleted/:id',verifyToken, adminPermiso, deleteRol);

export default routesRoles;