import jsonwebtoken from "jsonwebtoken";
import { adminPermissions, EmplPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config'
import { response } from "../utils/responses.js";
import Proveedor from "../models/proveedor.models.js"
import uniqid from 'uniqid';


const jwt = jsonwebtoken

//get all providers
export const getProveedor = async (req, res) => {

    try {

        const data = await Proveedor.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })
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
                PROV_EST: datos.PROV_EST || proveedor.PROV_EST
            }

            console.log(data)

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
    jwt.verify(req.token, process.env.SECRETWORD, async (err, datos) => {
        if (err) {
            response(res, 400, 105, "Something went wrong");
        }
        try {

            const { id } = req.params;
            const { Id_Rol_FK } = datos.user;
            const permiso = adminPermissions(Id_Rol_FK);


            if (!permiso) {
                response(res, 401, 401, "You don't have permissions");

            }
            const proveedor = await getProvID(id)
            if (proveedor.length > 0) {
                const responses = await deleteProveedor(id)

                response(res, 200, 200, responses);
            } else {
                response(res, 200, 204, proveedor);
            }


        } catch (err) {

            if (err.errno) {

                response(res, 400, err.errno, err.code);

            } else {
                response(res, 500, 500, "something went wrong");

            }
        }
    })
}