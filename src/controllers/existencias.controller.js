import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import existencias from "../models/existencias.model.js";
import Usuario from "../models/users.model.js";
import Producto from "../models/productos.models.js";
import { connection } from '../database/db.js';
import Inventarios from "../models/inventarios.model.js";


export const create = async (req, res) => {
   
}