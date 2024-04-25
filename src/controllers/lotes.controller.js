
import { adminPermissions, EmplPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config'
import { response } from "../utils/responses.js";
import lotes from "../models/lotes.model.js";
import uniqid from 'uniqid';
import existencias from "../models/existencias.model.js";

//get all lotes
export const getLotes = async (req, res) => {

    try {

        const data = await lotes.findAll({
             attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] },
             where: {ESTADO_REGISTRO: 1},
             include : {model: existencias, attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO']} },
             })
             
        if (data) {
            response(res, 200, 200, data);
        }
        else {
            response(res, 404, 404, "lotes not found");
        }


    } catch (error) {
        response(res, 500, 500, error);
    }
}


export const getLote = async (req, res) => {

    const { id } = req.params;

    try {

        const data = await lotes.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] },
            where: { ESTADO_REGISTRO: 1 },
            include : {model: existencias, attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO']} },
        })

        if (data) {
            response(res, 200, 200, data);
        }
        else {
            response(res, 404, 404, "lote not found");
        }

    } catch (error) {
        response(res, 500, 500, error);
    }
}


export const createLote = async (req, res) => {

    try {

        const ID_LOTE = uniqid();

        const { FEC_REC, FEC_VENC, COD_LOTE } = req.body;

        //create lote
        const data = {
            ID_LOTE: ID_LOTE,
            FEC_REC: FEC_REC,
            COD_LOTE: COD_LOTE,
            FEC_VENC:FEC_VENC
        }

        const newLote = await lotes.create(data);
        if (newLote) {
            response(res, 200)
        } else {
            response(res, 500, 500, "Error creating")
        }

    } catch (err) {

        response(res, 500, 500, err);

    }
}
export const updateLote = async (req, res) => {
    const { id } = req.params;
    const { FEC_REC, FEC_VENC } = req.body;
    try {
       
     
     

        const data = await lotes.update({
            FEC_REC: FEC_REC,
            FEC_VENC: FEC_VENC,
       
        }, {
            where: { ID_LOTE: id }
        });

        if (data) {
            response(res, 200);
        } else {
            response(res, 500, 500, "Error updating");
        }
    } catch (err) {
        response(res, 500, 500, err);
    }
}



export const deleteLote = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await lotes.findByPk(id)
        if (!data) {
            return response(res, 404, 404, 'Lote not found')
        } else {
            const existencia = await existencias.findAll({ where: { ID_LOTE_FK: id } })
            if (existencia.length > 0) {
               return response(res, 403, 403, 'You cannot delete this lote because it has existencias')
            } else {
                const borrarLote = await lotes.update(
                    { ESTADO_REGISTRO: false },
                    {
                        where: { ID_LOTE: id }
                    })

                if (borrarLote) {
                    return response(res, 200, 200, 'Lote deleted successfully')
                } else {
                    return response(res, 500, 500, 'Error deleting lote')
                }
            }
        }
    } catch (err) {
        response(res, 500, 500, err);
    }
}