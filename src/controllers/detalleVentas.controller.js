import jsonwebtoken from "jsonwebtoken"
import { adminPermissions, EmplPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config'
import { response } from "../utils/responses.js";
import ventas from "../models/detalleVentas.model.js";
import Usuario from "../models/users.model.js";
import Producto from "../models/productos.models.js";
import uniqid from 'uniqid';

const jwt = jsonwebtoken;
// get all ventas from response object
export const GetVentas = async (req, res) => {
    try {
        const data = await ventas.findAll()
        if (data) {
            response(res, 200, 200, data);
        } else {
            response(res, 400)
        }
    } catch (error) {
        response(res, 500, 500, "something went wrong");
    }
}

// get all ventas from response object

export const GetVentasId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ventas.findByPk(id)
        if (data) {
            response(res, 200, 200, data);
        } else {
            response(res, 400)
        }
    } catch (error) {
        response(res, 500, 500, "something went wrong");
    }
}

export const createVentas = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (req, res) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        } else {
            try {
                const Id_Det_Vent = uniqid();
                const { Id_Enc_FK, Id_Prod_Fk, cantidad, Precio_U, total } = req.body;

                const adminPermiso = adminPermissions(data.user.Id_Rol_FK);
                const emplPermiso = EmplPermissions(data.user.Id_Rol_FK);

                if (!adminPermiso && !emplPermiso) {
                    response(res, 403, 403, "you dont have permissions");

                } else {
                    const ventasExist = await ventas.findOne({ where: { Id_Det_Vent: Id_Det_Vent } })
                    const produdExist = await Producto.findByPk(PROD_ID_FK)

                    if (ventasExist || !produdExist) {
                        response(res, 500, 107, "ventas or productos already exist");
                    } else {
                        //create producto

                        const dataPro = {
                            Id_Det_Vent: Id_Det_Vent,
                            Id_Enc_FK: Id_Enc_FK,
                            Id_Prod_Fk: Id_Prod_Fk,
                            cantidad: cantidad,
                            Precio_U: Precio_U,
                            total: total
                        }
                            const nuevaVentas = await ventas.create(dataPro);
                            if(nuevaVentas) {
                                response(res, 200);
                            }else{
                                response(res, 500, 500, "Error creating")
                            }
                        }

                    }
                } catch (error) {
                    response(res, 500, 500, err);
                }
            }

    })
}


export const updateDetalleVentas = async (req, res) => {
    
}