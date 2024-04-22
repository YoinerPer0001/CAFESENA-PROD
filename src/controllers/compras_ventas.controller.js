import Usuario from "../models/users.model.js";
import Producto from "../models/productos.models.js";
import detalle from "../models/detalles.model.js";
import { Encabezados } from "../models/encabezado.model.js";
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { connection } from "../database/db.js";

//obtiene encabezados de un usuario x tipo
export const GetxUser = async (req, res) => {

    const { id, type } = req.params;

    const user = await Usuario.findByPk(id);

    const excludeAtr = { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] }

    if (user) {

        if (type == 1 || type == 2) {
            const encabezados = await Encabezados.findAll({
                where: { ID_USER_FK: id, TIPO_ENCABE: type, ESTADO_REGISTRO: 1 },
                attributes: excludeAtr,
                include:[
                    {
                        model:detalle,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO', 'Id_Enc_FK', 'Id_Prod_Fk'] },
                        include:[
                            {
                                model:Producto,
                                attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] }
                            }
                        ]
                    }
                ]
            })
            if (encabezados) {
                response(res, 200, 200, encabezados)
            } else {
                response(res, 404, 404, "not found");
            }
        } else {
            response(res, 404, 404, "type not found");
        }

    } else {
        response(res, 404, 404, "User not found");
    }



}

//obtiene compras o ventas por tipo 1:compra, 2:ventas
export const GetxType = async (req, res) => {

    const { type } = req.params;

    if (type == "1" || type == "2") {

        const encabezados = await Encabezados.findAll({
            where: { TIPO_ENCABE: type, ESTADO_REGISTRO: 1 },
            attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] },
            include:[
                {
                    model:detalle,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO', 'Id_Enc_FK', 'Id_Prod_Fk'] },
                    include:[
                        {
                            model:Producto,
                            attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] }
                        }
                    ]
                }
            ]
        })
        if (encabezados) {
            response(res, 200, 200, encabezados)
        } else {
            response(res, 404, 404, "not found");
        }
    } else {
        response(res, 404, 404, "type not found");
    }

}


//crear compras o ventas
export const createCompra_Venta = async (req, res) => {

    let transaction;
    try {
        const { ID_USER, MET_PAGO, TOTAL, TIPO_ENCABE, OBJ_DETALLES } = req.body;
        const ENC_ID = uniqid();
        
        const usuario = await Usuario.findByPk(ID_USER);
        

        if (usuario) {
            const data = {
                ENC_ID: ENC_ID,
                FECH_ENC: Date.now(),
                MET_PAGO: MET_PAGO,
                TOTAL: TOTAL,
                ID_USER_FK: ID_USER,
                TIPO_ENCABE: TIPO_ENCABE
            }

            transaction = await connection.transaction(); //transaccion para poder guardar valoresn en ambas entidades


            const encabezado = await Encabezados.create(data, { transaction })


            //creamos los detalles asociados a el encabezado

            await Promise.all(OBJ_DETALLES.map(async det => {
                const prod = await Producto.findByPk(det.Id_Prod);
                if (!prod) {
                    return response(res, 404, 404, "Product not found");
                } else {
                    const Id_Detalle = uniqid();

                    const datosEnv = {
                        Id_Detalle: Id_Detalle,
                        Id_Enc_FK: ENC_ID,
                        Id_Prod_Fk: det.Id_Prod,
                        cantidad: det.cantidad,
                        Precio_U: det.Precio_U
                    }
                    await detalle.create(datosEnv, { transaction })
                }

            }))

            await transaction.commit()

            response(res, 200)

            // if (encabezado) {
            //     
            // } else {
            //     response(res, 500, 500, "Error creating")
            // }
        } else {

            response(res, 404, 404, "User not found");
        }

    } catch (err) {
        response(res, 500, 500, err);
        if (transaction) await transaction.rollback();
        console.error('Error al agregar datos:', err);
    }



}





