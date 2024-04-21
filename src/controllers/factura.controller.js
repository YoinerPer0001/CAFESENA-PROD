import jsonwebtoken from "jsonwebtoken"
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Encabezados } from "../models/encabezado.model.js";
import Usuario from "../models/users.model.js";
import factura from "../models/factura.model.js";
import detalle from "../models/detalles.model.js";
import Producto from "../models/productos.models.js";

let atrExclude = { exclude: ['createdAt', 'updatedAt', 'Pass_User', 'Est_Email_User', 'ESTADO_REGISTRO'] };

export const getFacturas = async (req, res) => {
    try {
        const fact = await factura.findAll({
            attributes: atrExclude,
            where: {ESTADO_REGISTRO: 1}
            // include:[
            //     {
            //         model:Usuario, as: 'Empleado',
            //         attributes:atrExclude
            //     },
            //     {
            //         model: Encabezados,
            //         attributes:atrExclude,

            //         include:[
            //             {
            //                 model:Usuario,
            //                 attributes:atrExclude
            //             },
            //             {
            //                 model:detalle,
            //                 attributes:atrExclude,
            //                 include:[
            //                     {
            //                         model:Producto,
            //                         attributes:atrExclude
            //                     }
            //                 ]
            //             }
            //         ]
            //     }
            // ]
        });

        if (fact) {
            response(res, 200, 200, fact);
        } else {
            response(res, 404, 404, 'Invoices not found');
        }

    } catch (err) {
        response(res, 500, 500, err);
    }
}

export const getFacturasxId = async (req, res) => {
    try {
        const { id } = req.params;
        const fact = await factura.findByPk(id, {
            attributes: atrExclude,
            //include de ser necesario
        });

        if (fact) {
            response(res, 200, 200, fact);
        } else {
            response(res, 404, 404, 'Invoices not found');
        }

    } catch (err) {
        response(res, 500, 500, err);
    }
}

// export const getFacturasxUser = async (req, res) => {
//     try {

//         const { id } = req.params;

//         const user = await Usuario.findByPk(id)

//         if (!user) {
//             response(res, 404, 404, "user don't found");
//         } else {

//             const fact = await factura.findAll({
//                 attributes: atrExclude,
//                 include: [
//                     {
//                         model: Usuario, as: 'Empleado',
//                         attributes: atrExclude
//                     },
//                     {
//                         model: Encabezados,
//                         attributes: atrExclude,

//                         include: [
//                             {
//                                 model: Usuario,
//                                 attributes: atrExclude,
//                                 where: { Id_User: id }
//                             },
//                             {
//                                 model: detalle,
//                                 attributes: atrExclude,
//                                 include: [
//                                     {
//                                         model: Producto,
//                                         attributes: atrExclude
//                                     }
//                                 ]
//                             }
//                         ]
//                     }
//                 ]
//             });

//             if (fact) {
//                 response(res, 200, 200, fact);
//             } else {
//                 response(res, 404, 404, 'Invoices not found');
//             }
//         }

//     } catch (err) {
//         response(res, 500, 500, err);
//     }
// }

export const createFactura = async (req, res) => {
    try {
        const { Id_Enc } = req.body;

        const {Id_User} = req.Tokendata.user; //empleado logueado que creo la factura 
  
        const encab = await Encabezados.findByPk(Id_Enc);

        const fact = await factura.findOne({where:{FACT_ID: Id_Enc, ESTADO_REGISTRO: 1}})

        if (!encab || fact) {

            if(!encab){
                return response(res, 404, 404, "header not found");
            }else{
                return response(res, 404, 404, "Invoise is already created");
            }

        } else {

            const fact = await factura.create({
                FACT_ID: Id_Enc,
                ID_EMPLEADO: Id_User,
                FACT_FECH: Date.now()
            });

            if (fact) {
                response(res, 200);
            } else {
                response(res, 500, 500, 'Error Creating');
            }

        }

    } catch (err) {
        response(res, 500, 500, err);
    }
}

export const updateFactura = async (req, res) => {
    try{

        const {id} = req.params;

        const datos = req.body;
        let datosEnv = {};

        let fact = await factura.findByPk(id)

        if(!fact){
            return response(res, 404, 404, "Invoices not found");
        }else{
            fact = fact.dataValues;

            if(datos.ID_EMPLEADO){
                const user = await Usuario.findByPk(datos.ID_EMPLEADO)
                if(!user){
                    return response(res, 404, 404, "User not found");
                }else{
                    datosEnv.ID_EMPLEADO = datos.ID_EMPLEADO;
                }
            }
             datosEnv ={
                ID_EMPLEADO: datos.ID_EMPLEADO || fact.ID_EMPLEADO,
                FACT_FECH: datos.FACT_FECH || fact.FACT_FECH,
                ESTADO_REGISTRO: datos.ESTADO_REGISTRO || fact.ESTADO_REGISTRO
            }

            const updated = await factura.update(datosEnv, {where:{FACT_ID: id}})
            if(updated){
                response(res, 200);
            }else{
                response(res, 500, 500, 'Error Updating');
            }
        }

    }catch (err) {
        response(res, 500, 500, err);
    }
}

export const deleteFact = async (req, res, ) => {
    try {
        const { id } = req.params;
        const fact = await factura.findByPk(id)
        if (!fact) {
            return response(res, 404, 404, 'invoise not found');
        } else {
            
            const deleted = await factura.update({ESTADO_REGISTRO: 0}, {where: {FACT_ID: id}})

            if(deleted){
                response(res, 200);
            }else{
                response(res, 500, 500, 'Error Deleting');
            }
        }
        
    } catch (err) {
        response(res, 500, 500, err);
    }
    
}



