import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import existencias from "../models/existencias.model.js";
import Usuario from "../models/users.model.js";
import Producto from "../models/productos.models.js";
import { connection } from '../database/db.js';
import Inventarios from "../models/inventarios.model.js";
import lotes from '../models/lotes.model.js';
import Proveedor from '../models/proveedor.models.js';


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
            where: { ESTADO_REGISTRO: 1 },
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
    } catch (err) {
        response(res, 500, 500, err);
    }
}

export const updateStock = async (req, res) => {

    let transaction;
    try {

        const { id } = req.params;
        const datos = req.body;
        let prodId = null;
        let provId = null;
        let loteId = null;

        //verificamos que exista el stock
        let exists = await existencias.findByPk(id)
        if (!exists) {
            response(res, 404, 404, "Stock not found");
        } else {
            exists = exists.dataValues;

            if (datos.PRO_ID) {
                //verificamos que existe el producto
                let prod = await Producto.findByPk(datos.PRO_ID);

                if (!prod) {
                    return response(res, 404, 404, "Product not found");
                } else {
                    prodId = datos.PRO_ID;
                }
            }

            if (datos.PROV_ID) {
                //verificamos que existe el producto
                let proveedor = await Proveedor.findByPk(datos.PROV_ID);

                if (!prod) {
                    return response(res, 404, 404, "Product not found");
                } else {
                    provId = datos.PRO_ID;
                }
            }

            if (datos.LOTE_ID) {
                //verificamos que existe el producto
                let lote = await lotes.findByPk(datos.LOTE_ID);
                if (!lote) {
                    return response(res, 404, 404, "Lote not found");
                } else {
                    loteId = datos.LOTE_ID;
                }
            }

            if (datos.CANT_PROD && exists.ESTADO_REGISTRO != 0) {

                transaction = await connection.transaction();
                let updatedInventoryRows;
                //verificamos si se añaden o se resta la cantidad actual
                const cantRestante = parseInt(exists.CANT_PROD) - parseInt(datos.CANT_PROD);

                updatedInventoryRows = await Inventarios.update(
                    { CANT_TOTAL: connection.literal(`CANT_TOTAL - ${cantRestante}`) },
                    { where: { INV_ID: exists.INV_ID_FK }, transaction: transaction }
                );


            }

            const datosenv = {
                PRO_ID_FK: prodId || exists.PRO_ID_FK,
                CANT_PROD: datos.CANT_PROD || exists.CANT_PROD,
                INV_ID_FK: provId || exists.INV_ID_FK,
                LOTE_ID_FK: loteId || exists.LOTE_ID_FK
            }

            //actualizamos existencias

            const updatedRows = await existencias.update(datosenv, { where: { EX_ID: id }, transaction: transaction });
            await transaction.commit();
            if (updatedRows) {

                response(res, 200)
            } else {
                await transaction.rollback();
                response(res, 500, 500, "Error updating")
            }
        }
    } catch (err) {
        response(res, 500, 500, err);
    }
}

export const deleteStock = async (req, res) => {
    let transaction;
    try {

        const { id } = req.params;

        let exists = await existencias.findByPk(id)
        if (!exists) {
            response(res, 404, 404, "Stock not found");
        } else {

            transaction = await connection.transaction();

            exists = exists.dataValues;
            const deleted = await existencias.update({ ESTADO_REGISTRO: false }, { where: { EX_ID: id }, transaction: transaction })

            // Actualizar inventario
            const updatedInventoryRows = await Inventarios.update(
                { CANT_TOTAL: connection.literal(`CANT_TOTAL - ${exists.CANT_PROD}`) },
                { where: { INV_ID: exists.INV_ID_FK }, transaction: transaction }
            );

            if (updatedInventoryRows[0] === 1) {
                await transaction.commit();
                response(res, 200)

            } else {
                await transaction.rollback();

            }
        }

    } catch (err) {
        response(res, 500, 500, err);
    }
}