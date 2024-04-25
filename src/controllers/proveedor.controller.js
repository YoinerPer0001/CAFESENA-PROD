
import { adminPermissions, EmplPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config'
import { response } from "../utils/responses.js";
import Proveedor from "../models/proveedor.models.js"
import uniqid from 'uniqid';


//get all providers
export const getProveedor = async (req, res) => {

    try {

        const data = await Proveedor.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] },
            where: { ESTADO_REGISTRO: 1 }
        })
        if (data) {
            response(res, 200, 200, data);
        }
        else {
            response(res, 404, 404, "providers not found");
        }


    } catch (error) {
        response(res, 500, 500, error);
    }
}

//get provider x id
export const getProveedorxId = async (req, res) => {

    try {

        const { id } = req.params;

        const data = await Proveedor.findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt'] } })

        if (data) {
            response(res, 200, 200, data);
        }
        else {
            response(res, 404, 404, "provider not found");
        }


    } catch (error) {
        response(res, 500, 500, error);
    }
}

export const createProveedor = async (req, res) => {

    try {

        const PROV_ID = uniqid();

        const { PROV_NOM, PROV_CONTACTO } = req.body;

        //create category
        const data = {
            PROV_ID: PROV_ID,
            PROV_NOM: PROV_NOM.toLowerCase(),
            PROV_CONTACTO: PROV_CONTACTO
        }

        const newProveedor = await Proveedor.create(data);
        if (newProveedor) {
            response(res, 200)
        } else {
            response(res, 500, 500, "Error creating")
        }

    } catch (err) {

        response(res, 500, 500, err);

    }
}

export const UpdateProveedor = async (req, res) => {

    try {

        //Data
        const { id } = req.params;
        const datos = req.body;

        //verify exist proveedor

        let proveedor = await Proveedor.findByPk(id)

        if (!proveedor) {

            response(res, 404, 404, "Provider don't exist");

        } else {

            proveedor = proveedor.dataValues;

            const data = {
                PROV_NOM: datos.PROV_NOM || proveedor.PROV_NOM,
                PROV_CONTACTO: datos.PROV_CONTACTO || proveedor.PROV_CONTACTO,
                PROV_EST: datos.PROV_EST || proveedor.PROV_EST,
                ESTADO_REGISTRO: datos.ESTADO_REGISTRO || proveedor.ESTADO_REGISTRO
            }

            const responses = await Proveedor.update(data, { where: { PROV_ID: id } })

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



export const deleteProveedor = async (req, res) => {

    try {
        const { id } = req.params;
        const Prov = await Proveedor.findByPk(id)
        if (!Prov) {
            return response(res, 404, 404, 'Provider not found');
        } else {

            const proveedores = await proveedor_producto.findAll({ where: { Id_Prov_FK: id } })

            if (proveedores) {
                return response(res, 403, 403, "You cannot delete this provider, because has products associated")
            } else {
                const deleted = await Proveedor.update({ ESTADO_REGISTRO: 0 }, { where: { PROV_ID: id } })

                if (deleted) {
                    response(res, 200, 200);
                } else {
                    response(res, 500, 500, 'Error Deleting');
                }
            }

        }

    } catch (err) {
        response(res, 500, 500, err);
    }

}