import jsonwebtoken from "jsonwebtoken"
import { adminPermissions, EmplPermissions } from "../utils/manage.permissions.js";
import detalle_compra from "../models/detalle_compras.model.js";
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import Producto from "../models/productos.models.js";
import Proveedor from "../models/proveedor.models.js";


const jwt = jsonwebtoken;

//get all det
export const GetDetCompras = async (req, res) => {

    try {

        const data = req.Tokendata;
        const adminPermiso = adminPermissions(data.user.Id_Rol_FK)
        const emplPermiso = EmplPermissions(data.user.Id_Rol_FK)
        if (!adminPermiso || !emplPermiso) {
            response(res, 403, 403, "you dont have permissions");
        } else {

            const compra = await detalle_compra.findAll();

            if (compra) {
                response(res, 200, 200, compra);
            } else {
                response(res, 404);
            }
        }

    } catch (error) {
        response(res, 500, 500, error);
    }

}

//get  det by id
export const GetDetCompraxId = async (req, res) => {

    try {
        const { id } = req.params;

        const compra = await detalle_compra.findByPk(id)

        if (compra) {
            response(res, 200, 200, compra);
        } else {
            response(res, 404);
        }


    } catch (err) {
        response(res, 500, 500, "something went wrong");
    }

}

// create det
export const createDetCompra = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 401, 401, "Token error");
        } else {

            try {

                const Id_Detalle = uniqid();
                let datosEnv;

                const { Id_Enc, Id_Prod, cantidad, Precio_U, Prov_Id } = req.body;

                const adminPermiso = adminPermissions(data.user.Id_Rol_FK);
                const emplPermiso = EmplPermissions(data.user.Id_Rol_FK);


                if (!adminPermiso && !emplPermiso) {

                    response(res, 403, 403, "you dont have permissions");
                } else {
                    const encabezado = await encabezado.findByPk(Id_Enc)
                    const producto = await Producto.findByPk(Id_Prod)
                    const proovedor = await Proveedor.findByPk(Prov_Id)

                    if (!encabezado || !producto || !proovedor) {
                        response(res, 404, 404, "header or Product not found");
                    } else {

                        datosEnv = {
                            Id_Detalle: Id_Detalle,
                            Id_Enc_FK: Id_Enc,
                            Id_Prod_Fk: Id_Prod,
                            cantidad: cantidad,
                            Precio_U: Precio_U,
                            Prov_Id_FK: Prov_Id
                        }

                        const created = await detalle_compra.create(datosEnv);

                        if (created) {
                            response(res, 200);
                        } else {
                            response(res, 500, 500, 'Error Creating')
                        }
                    }
                }


            } catch (err) {

                response(res, 500, 500, "something went wrong");

            }


        }




    })
}

//update det
export const UpdateDetalleC = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 401, 401, "Token not valid");
        } else {

            try {
                const { Id_Rol_FK } = data.user;

                const adminPermiso = adminPermissions(data.user.Id_Rol_FK);
                const emplPermiso = EmplPermissions(data.user.Id_Rol_FK);




                if (!adminPermiso && !emplPermiso) {

                    response(res, 403, 403, "you dont have permissions");
                } else {

                    //Data
                    const { id } = req.params;
                    const datos = req.body;

                    //verify exist detail

                    let detail = await detalle_compra.findByPk(id)

                    if (!detail) {

                        response(res, 404, 404, "Detail don't exist");

                    } else {

                        detail = detail.dataValues;

                        const datosEnv = {
                            Id_Enc_FK: datos.Id_Enc || detail.Id_Enc_FK,
                            Id_Prod_Fk: datos.Id_Prod || detail.Id_Prod_Fk,
                            cantidad: datos.cantidad || detail.cantidad,
                            Precio_U: datos.Precio_U || detail.Precio_U,
                            Prov_Id_FK: datos.Prov_Id || detail.Prov_Id_FK
                        }

                        const updated = await detalle_compra.update(datosEnv, { where: { Id_Detalle: id } })

                        if (updated) {
                            response(res, 200);
                        } else {
                            response(res, 500, 500, 'Error Updating')
                        }

                    }

                }

            } catch (err) {

                response(res, 500, 500, "something went wrong");

            }
        }


    })
}
