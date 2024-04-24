import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import existencias from "../models/existencias.model.js";
import Usuario from "../models/users.model.js";
import Producto from "../models/productos.models.js";
import { connection } from '../database/db.js';
import Inventarios from "../models/inventarios.model.js";
import lotes from '../models/lotes.model.js';


export const getAll = async (req, res) => {
    try {
        const exists = await existencias.findAll({
            include: [
                {
                    model: Producto,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] }
                },
                {
                    model: lotes,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] }
                },
                {
                    model: Inventarios,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] }
                }
            ],
            where:{ESTADO_REGISTRO:1},
            attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] }
        })

        if (exists) {
            response(res, 200, 200, exists);
        } else {
            response(res, 404, 404, "Exists not found");
        }
    } catch (err) {
        response(res, 500, 500, err);
    }
}

export const getlote = async (req, res) => {
    try {
        const { id } = req.params;

        const lote = await lotes.findByPk(id)
        if (!lote) {
            response(res, 404, 404, 'Lote not found');
        } else {
            const exists = await existencias.findOne({
                include: [
                    {
                        model: Producto,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] }
                    },
                    {
                        model: lotes,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] }
                    },
                    {
                        model: Inventarios,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] }
                    }
                ],
                where: { ID_LOTE_FK: id } 
            })
            if (exists) {
                response(res, 200, 200, exists);
            } else {
                response(res, 404, 404, "Exists not found");
            }
        }
        }catch (err) {
            response(res, 500, 500, err);
        }
    }