
import 'dotenv/config';
import { adminPermissions, EmplPermissions } from "../utils/manage.permissions.js";
import { response } from "../utils/responses.js";
import Inventarios from "../models/inventarios.model.js";
import uniqid from 'uniqid';
import Producto from "../models/productos.models.js";
import existencias from '../models/existencias.model.js';



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
                where: { ESTADO_REGISTRO: 1 },// REGISTROS ACTIVOS

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

// export const GetInventarioxLote = async (req, res) => {

//     try {

//         const { lote } = req.params;

//         const loteExist = await Inventarios.findOne({ where: { LOTE: lote } })

//         if (!loteExist) {
//             response(res, 404, 404, "Lote not found");
//         } else {
//             const inventory = await Inventarios.findAll(
//                 {
//                     attributes: { exclude: ['createdAt', 'updatedAt'] },
//                     where: { ESTADO_REGISTRO: 1, LOTE: lote }, // REGISTROS ACTIVOS
//                     include: [
//                         {
//                             model: Producto,
//                             attributes: { exclude: ['createdAt', 'updatedAt'] }
//                         }
//                     ]
//                 })

//             if (inventory) {
//                 response(res, 200, 200, inventory);
//             }
//             else {
//                 response(res, 404, 404, "Inventory not found");
//             }

//         }




//     } catch (error) {
//         response(res, 500, 500, error);
//     }

// }


export const createInventario = async (req, res) => {
    try {

        const INV_ID = uniqid();

        const { CANT_TOTAL } = req.body;
        //create inventory
        const data = {
            INV_ID: INV_ID,
            CANT_TOTAL: CANT_TOTAL,
        }

        const newInventario = await Inventarios.create(data);
        if (newInventario) {
            response(res, 200)
        } else {
            response(res, 500, 500, "Error creating")
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

            dataenv = {
                CANT_TOTAL: datos.CANT_TOTAL || inventory.CANT_TOTAL,
                INV_EST: datos.INV_EST || inventory.INV_EST,
                ESTADO_REGISTRO: datos.ESTADO_REGISTRO || inventory.ESTADO_REGISTRO
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
    try {
        const { id } = req.params;
        const data = await Inventarios.findByPk(id)
        if (!data) {
            return response(res, 404, 404, 'Inventory not found')
        } else {
            const existencia = await existencias.findAll({ where: { INV_ID_FK: id } })
            if (existencia) {
                return response(res, 403, 403, 'You cannot delete this inventory because it has stok associated')
            } else {
                const borrar = Inventarios.update(
                    { ESTADO_REGISTRO: false },
                    {
                        where: { INV_ID: id }
                    })

                if (borrar) {
                    return response(res, 200, 200, 'Inventory deleted successfully')
                } else {
                    return response(res, 500, 500, 'Error deleting Inventory')
                }
            }
        }


    } catch (error) {
        response(res, 500, 500, error);
    }

}