import jsonwebtoken from "jsonwebtoken"
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Encabezados } from "../models/encabezado.model.js";
import Usuario from "../models/users.model.js";



const jwt = jsonwebtoken;
//obtiene encabezados 
export const GetAll = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 401, 401, "Token Error");
        } else {

            const encabezados = await Encabezados.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })
            if (encabezados) {
                response(res, 200, 200, encabezados)
            } else {
                response(res, 404, 404, "not found");
            }

        }
    })
}

//obtiene encabezados por tipo 1:compra, 2:ventas
export const GetxType = async (req, res) => {

    const { type } = req.params;

    if (type == "1" || type == "2") {

        const encabezados = await Encabezados.findAll({ where: { TIPO_ENCABE: type }, attributes: { exclude: ['createdAt', 'updatedAt'] } })
        if (encabezados) {
            response(res, 200, 200, encabezados)
        } else {
            response(res, 404, 404, "not found");
        }
    } else {
        response(res, 404, 404, "type not found");
    }

}

//obtiene encabezados de un usuario x tipo
export const GetxUser = async (req, res) => {

    const { id, type } = req.params;

    const user = await Usuario.findByPk(id);

    const excludeAtr = { exclude: ['createdAt', 'updatedAt'] }

    if (user) {

        if (type == 1 || type == 2) {
            const encabezados = await Encabezados.findAll({
                where: { ID_USER_FK: id, TIPO_ENCABE: type },
                attributes: excludeAtr,
                // include: [
                //     { 
                //         model: detalle,
                //         attributes: excludeAtr,
                //         include: [
                //             {
                //                 model: Producto,
                //                 attributes: excludeAtr
                //             }

                //         ]
                //      }
                // ]
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

//crear encabezados
export const createEncabezado = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 401, 401, "Token Error");
        } else {
            const datos = req.body;
            const ENC_ID = uniqid();
            const usuario = await Usuario.findByPk(datos.ID_USER);
            if (usuario) {
                const data = {
                    ENC_ID: ENC_ID,
                    FECH_ENC: Date.now(),
                    MET_PAGO: datos.MET_PAGO,
                    TOTAL: datos.TOTAL,
                    ID_USER_FK: datos.ID_USER,
                    TIPO_ENCABE: datos.TIPO_ENCABE
                }
                const encabezado = await Encabezados.create(data)

                if (encabezado) {
                    response(res, 200)
                } else {
                    response(res, 500, 500, "Error creating")
                }
            } else {
                response(res, 404, 404, "User not found");
            }

        }
    })
}

//actualizar informacion del encabezado

export const UpdateEncabezado = async (req, res) => {

    try {

        //Data
        const { id } = req.params;
        const datos = req.body;
        //verify exist category

        let Encabezado = await Encabezados.findByPk(id)

        if (!Encabezado) {

            response(res, 404, 404, "encabezado don't exist");

        } else {
            Encabezado = Encabezado.dataValues;
            const data = {
                PROD_ID_FK: datos.PROD_ID_FK || Encabezado.PROD_ID_FK,
                FECH_ENC: datos.FECH_ENC || Encabezado.FECH_ENC,
                MET_PAGO: datos.MET_PAGO || Encabezado.MET_PAGO,
                TOTAL: datos.TOTAL || Encabezado.TOTAL,
                TIPO_ENCABE: datos.TIPO_ENCABE || Encabezado.TIPO_ENCABE
            }

            const responses = await Encabezados.update(data, { where: { ENC_ID: id } })

            if (responses) {
                response(res, 200)
            } else {
                response(res, 500, 500, "Error updating")
            }

        }


    } catch (err) {

        response(res, 500, 500, "something went wrong");
        console.log(err)

    }
}