import express from 'express';
import { getLotes, getLote, createLote, updateLote, deleteLote } from '../../controllers/lotes.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";
import {validateLoteCreate, validateLoteUpdate} from '../../validators/lotes.validator.js'
import { AdminEmplPermissions, adminPermiso } from '../../middlewares/managePermissions.js'

const routesLotes = express();


routesLotes.get('/api/v1/lotes', getLotes);


routesLotes.get('/api/v1/lotes/:id',  getLote );


routesLotes.post('/api/v1/lotes/create', validateLoteCreate,  verifyToken,  AdminEmplPermissions, createLote);


routesLotes.put('/api/v1/lotes/update/:id',validateLoteUpdate, verifyToken, AdminEmplPermissions, updateLote);

routesLotes.delete('/api/v1/lotes/delete/:id',verifyToken, adminPermiso, deleteLote);

export default routesLotes;