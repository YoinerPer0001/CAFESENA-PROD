import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config';
import { adminPermissions, EmplPermissions } from "../utils/manage.permissions.js";
import { response } from "../utils/responses.js";
import Inventarios from "../models/inventarios.model.js";
import uniqid from 'uniqid';
import Producto from "../models/productos.models.js";

const jwt = jsonwebtoken;

//get all inventario
export const GetInventarios = async (req, res) => {

    try {

        const inventory = await Inventarios.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: { ESTADO_REGISTRO: 1 } // REGISTROS ACTIVOS
        })

        if (inventory) {
            response(res, 200, 200, inventory);
        }
        else {
            response(res, 404, 404, "Inventories not found");
        }


    } catch (error) {
        response(res, 500, 500, error);
    }

}

export const GetInventarioxId = async (req, res) => {

    try {

        const { id } = req.params;

        const inventory = await Inventarios.findByPk(id,
            {
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: { ESTADO_REGISTRO: 1 } ,// REGISTROS ACTIVOS
                include:[
                    {
                        model: Producto,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }
                ]
            })

        if (inventory) {
            response(res, 200, 200, inventory);
        }
        else {
            response(res, 404, 404, "Inventory not found");
        }


    } catch (error) {
        response(res, 500, 500, error);
    }

}

export const GetInventarioxLote = async (req, res) => {

    try {

        const { lote } = req.params;

        const loteExist = await Inventarios.findOne({ where: { LOTE: lote } })

        if (!loteExist) {
            response(res, 404, 404, "Lote not found");
        } else {
            const inventory = await Inventarios.findAll(
                {
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    where: { ESTADO_REGISTRO: 1, LOTE: lote }, // REGISTROS ACTIVOS
                    include: [
                        {
                            model: Producto,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        }
                    ]
                })

            if (inventory) {
                response(res, 200, 200, inventory);
            }
            else {
                response(res, 404, 404, "Inventory not found");
            }

        }




    } catch (error) {
        response(res, 500, 500, error);
    }

}


export const createInventario = async (req, res) => {
    try {

        const INV_ID = uniqid();

        const { PROD_ID_FK, PROD_CANT, LOTE, FECH_REC, FECH_VENC } = req.body;

        const producto = await Producto.findByPk(PROD_ID_FK);

        if (!producto) {
            response(res, 404, 404, "Product not found");

        } else {

            //create inventory
            const data = {
                INV_ID: INV_ID,
                PROD_ID_FK: PROD_ID_FK,
                PROD_CANT: PROD_CANT,
                LOTE: LOTE,
                FECH_REC: FECH_REC,
                FECH_VENC: FECH_VENC
            }

            const newInventario = await Inventarios.create(data);
            if (newInventario) {
                response(res, 200)
            } else {
                response(res, 500, 500, "Error creating")
            }

        }
    } catch (err) {

        response(res, 500, 500, err);

    }
}

export const UpdateInventarios = async (req, res) => {
    try {

        //Data
        const { id } = req.params;
        const datos = req.body;
        //verify exist category

        let inventory = await Inventarios.findByPk(id)

        if (!inventory) {

            response(res, 404, 404, "Inventario don't exist");

        } else {
            inventory = inventory.dataValues;
            let dataenv;

            if (datos.PROD_ID_FK) {
                const producto = await Producto.findByPk(datos.PROD_ID_FK);

                if (!producto) {
                    return response(res, 404, 404, "Product not found");

                } else {

                    dataenv = {
                        PROD_ID_FK: datos.PROD_ID_FK,
                        PROD_CANT: datos.PROD_CANT || inventory.PROD_CANT,
                        INV_EST: datos.INV_EST || inventory.INV_EST,
                        LOTE: datos.LOTE || inventory.LOTE,
                        FECH_REC: datos.FECH_REC || inventory.FECH_REC,
                        FECH_VENC: datos.FECH_VENC || inventory.FECH_VENC,
                    }
                }

            } else {

                dataenv = {
                    PROD_CANT: datos.PROD_CANT || inventory.PROD_CANT,
                    INV_EST: datos.INV_EST || inventory.INV_EST,
                    LOTE: datos.LOTE || inventory.LOTE,
                    FECH_REC: datos.FECH_REC || inventory.FECH_REC,
                    FECH_VENC: datos.FECH_VENC || inventory.FECH_VENC,
                }
            }

            const responses = await Inventarios.update(dataenv, { where: { INV_ID: id } })

            if (responses) {
                response(res, 200)
            } else {
                response(res, 500, 500, "Error updating")
            }


        }

    } catch (err) {

        response(res, 500, 500, err);


    }
}


export const deleteInv = async (req, res) => {
    const { id } = req.params;
    try {

        const data = await Inventarios.findByPk(id)
        if (!data) {
            response(res, 404, 404, 'Inventory not found')
        } else {

            const borrarInventario = Inventarios.update(
                { ESTADO_REGISTRO: false },
                {
                    where: { INV_ID: id, ESTADO_REGISTRO: true }
                }
            )

            if (borrarInventario) {
                response(res, 200)
            }
            else {
                response(res, 500, 500, "Error deleting")
            }

        }


    } catch (error) {
        response(res, 500, 500, error);
    }

}