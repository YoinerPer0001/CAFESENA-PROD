
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Encabezados } from "../models/encabezado.model.js";
import Usuario from "../models/users.model.js";
import Producto from "../models/productos.models.js";


//obtiene encabezados 
export const GetAll = async (req, res) => {

    try {
        const encabezados = await Encabezados.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] },
            where: { ESTADO_REGISTRO: 1 }
        })
        if (encabezados) {
            response(res, 200, 200, encabezados)
        } else {
            response(res, 404, 404, "not found");
        }

    } catch (err) {
        response(res, 500, 500, err);
    }


}

//obtiene encabezados por tipo 1:compra, 2:ventas
export const GetxType = async (req, res) => {

    const { type } = req.params;

    if (type == "1" || type == "2") {

        const encabezados = await Encabezados.findAll({
            where: { TIPO_ENCABE: type, ESTADO_REGISTRO: 1 },
            attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] }
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

    try {
        const { ID_USER, MET_PAGO, TOTAL, TIPO_ENCABE } = req.body;
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
            const encabezado = await Encabezados.create(data)

            if (encabezado) {
                response(res, 200)
            } else {
                response(res, 500, 500, "Error creating")
            }
        } else {
            response(res, 404, 404, "User not found");
        }

    } catch (err) {
        response(res, 500, 500, err);

    }



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

            response(res, 404, 404, "header don't exist");

        } else {
            Encabezado = Encabezado.dataValues;

            let data = {
                ID_USER_FK: datos.ID_USER || Encabezado.ID_USER_FK,
                FECH_ENC: datos.FECH_ENC || Encabezado.FECH_ENC,
                MET_PAGO: datos.MET_PAGO || Encabezado.MET_PAGO,
                TOTAL: datos.TOTAL || Encabezado.TOTAL,
                TIPO_ENCABE: datos.TIPO_ENCABE || Encabezado.TIPO_ENCABE,
                ESTADO_REGISTRO: datos.ESTADO_REGISTRO || Encabezado.ESTADO_REGISTRO
            }

            if (datos.ID_USER) {
                const User = await Usuario.findByPk(datos.ID_USER);
                if (!prod) {
                    return response(res, 404, 404, "User not found");
                } else {
                    data.ID_USER_FK = datos.ID_USER
                }
            }

            const responses = await Encabezados.update(data, { where: { ENC_ID: id } })

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


export const deleteEnc = async (req, res, ) => {
    try {
        const { id } = req.params;
        const enc = await Encabezados.findByPk(id)
        if (!enc) {
            response(res, 404, 404, 'header not found');
        } else {
            
            const deleted = await Encabezados.update({ESTADO_REGISTRO: 0}, {where: {ENC_ID: id}})

            if(deleted){
                response(res, 200, 200);
            }else{
                response(res, 500, 500, 'Error Deleting');
            }
        }
        
    } catch (err) {
        response(res, 500, 500, err);
    }
    
}