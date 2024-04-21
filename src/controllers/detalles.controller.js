
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import Producto from "../models/productos.models.js";
import Proveedor from "../models/proveedor.models.js";
import { Encabezados } from "../models/encabezado.model.js";
import detalle from "../models/detalles.model.js";


//get all det
export const GetDet = async (req, res) => {

    try {

        const compra = await detalle.findAll(
            {
                attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] },
                where: { ESTADO_REGISTRO: 1 } //registros activos
            });

        if (compra) {
            response(res, 200, 200, compra);
        } else {
            response(res, 404);
        }

    } catch (err) {
        response(res, 500, 500, err);
    }

}

//get  det by id
export const GetDetxId = async (req, res) => {

    try {
        const { id } = req.params;

        const compra = await detalle.findByPk(id, 
            { attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] } })

        if (compra) {
            response(res, 200, 200, compra);
        } else {
            response(res, 404);
        }


    } catch (err) {
        response(res, 500, 500, "something went wrong");
    }

}

//get  dets by header
export const GetDetxIdHeader = async (req, res) => {

    try {
        const { id } = req.params;

        const encabezado = await Encabezados.findByPk(id)

        if (encabezado) {
            const detalles = await detalle.findAll({
                where: { Id_Enc_FK: id, ESTADO_REGISTRO: 1 },
                attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] }
            })

            if (detalles) {
                response(res, 200, 200, detalles);
            } else {
                response(res, 404, 404, 'details not found');
            }
        } else {
            response(res, 404, 404, 'header not found');
        }


    } catch (err) {
        response(res, 500, 500, "something went wrong");
    }

}

// create det
export const createDet = async (req, res) => {

    try {

        const Id_Detalle = uniqid();
        let datosEnv;

        const { Id_Enc, Id_Prod, cantidad, Precio_U } = req.body;

        const encabezado = await Encabezados.findByPk(Id_Enc)
        const producto = await Producto.findByPk(Id_Prod)

        if (!encabezado || !producto) {
            if (!encabezado) {
                return response(res, 404, 404, "header not found");
            } else {
                return response(res, 404, 404, "Product not found");
            }
        } else {

            datosEnv = {
                Id_Detalle: Id_Detalle,
                Id_Enc_FK: Id_Enc,
                Id_Prod_Fk: Id_Prod,
                cantidad: cantidad,
                Precio_U: Precio_U
            }

            const created = await detalle.create(datosEnv);

            if (created) {
                response(res, 200);
            } else {
                response(res, 500, 500, 'Error Creating')
            }
        }

    } catch (err) {

        response(res, 500, 500, err);

    }

}

//update det
export const UpdateDetalle = async (req, res) => {

    try {

        //Data
        const { id } = req.params;
        const datos = req.body;
        let updtEncabezado;
        let updtProducto;

        //verify exist detail

        let detail = await detalle.findByPk(id)

        if (!detail) {

            response(res, 404, 404, "Detail don't exist");

        } else {

            detail = detail.dataValues;

            if (datos.Id_Enc) {
                const enc = await Encabezados.findByPk(datos.Id_Enc)
                if (!enc) {
                    return response(res, 404, 404, "header not found");
                } else {
                    updtEncabezado = datos.Id_Enc;
                }
            }

            if (datos.Id_Prod) {
                const Productos = await Producto.findByPk(datos.Id_Prod)
                if (!Productos) {
                    return response(res, 404, 404, "Product not found");
                } else {
                    updtProducto = datos.Id_Prod;
                }
            }


            const datosEnv = {
                Id_Enc_FK: updtEncabezado || detail.Id_Enc_FK,
                Id_Prod_Fk: updtProducto || detail.Id_Prod_Fk,
                cantidad: datos.cantidad || detail.cantidad,
                Precio_U: datos.Precio_U || detail.Precio_U,
                ESTADO_REGISTRO: datos.ESTADO_REGISTRO || detail.ESTADO_REGISTRO
            }
          

            const updated = await detalle.update(datosEnv, { where: { Id_Detalle: id } })

            if (updated) {
                response(res, 200);
            } else {
                response(res, 500, 500, 'Error Updating')
            }

        }



    } catch (err) {

        response(res, 500, 500, err);

    }
}

export const deleteDet = async (req, res, ) => {
    try {
        const { id } = req.params;
        const det = await detalle.findByPk(id)
        if (!det) {
            response(res, 404, 404, 'detail not found');
        } else {
            
            const deleted = await detalle.update({ESTADO_REGISTRO: 0}, {where: {Id_Detalle: id}})

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
