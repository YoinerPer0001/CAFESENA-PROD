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

        const inventory = await Inventarios.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })

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

        const inventory = await Inventarios.findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt'] } })

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

export const createInventario = async (req, res) => {
    try {

        const INV_ID = uniqid();

        const { PROD_ID_FK, PROD_CANT, INV_EST, } = req.body;

        const producto = await Producto.findByPk(PROD_ID_FK);

        if (!producto) {
            response(res, 404, 404, "Product not found");

        } else {

            //create inventory
            const data = {
                INV_ID: INV_ID,
                PROD_ID_FK: PROD_ID_FK,
                PROD_CANT: PROD_CANT,
                INV_EST: INV_EST,
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
                        INV_EST: datos.INV_EST || inventory.INV_EST
                    }
                }

            } else {
                dataenv = {
                    PROD_CANT: datos.PROD_CANT || inventory.PROD_CANT,
                    INV_EST: datos.INV_EST || inventory.INV_EST
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

        response(res, 500, 500, "something went wrong");


    }
}


// export const deleteInv = async (req, res) => {
//     const { id } = req.params;
//     try {
//         jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
//             if (err) {
//                 response(res, 401, 401, "Invalid");
//             } else {
//                 const permisos = adminPermissions(data.user.Id_Rol_FK);
//                 if (permisos) {
//                     const data = await Inventarios.findOne({
//                         where: {
//                             INV_ID: id
//                         },
//                     })
//                     if (!data) {
//                         response(res, 200, 200, 'eliminado correctamente')
//                     }
//                     const borrarInventario = Inventarios.update(
//                         { activo: false },
//                         {
//                             where: {
//                                 INV_ID: id,
//                                 activo: true
//                             }
//                         }
//                     )
//                     if (borrarInventario) {
//                         response(res, 200, 200, "eliminado correctamente")
//                     }
//                     else {
//                         response(res, 500, 500, "error al eliminar")
//                     }

//                 }
//             }
//         });

//     } catch (error) {
//         console.log(error)

//     }
// }