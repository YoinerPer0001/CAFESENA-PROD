import Usuario from "../models/users.model.js";
import Producto from "../models/productos.models.js";
import detalle from "../models/detalles.model.js";
import { Encabezados } from "../models/encabezado.model.js";
import uniqid from 'uniqid';
import Inventarios from "../models/inventarios.model.js";
import { response } from "../utils/responses.js";
import { connection } from "../database/db.js";
import existencias from "../models/existencias.model.js";
import { where } from "sequelize";
import lotes from "../models/lotes.model.js";

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
                include: [
                    {
                        model: detalle,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO', 'Id_Enc_FK', 'Id_Prod_Fk'] },
                        include: [
                            {
                                model: Producto,
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
            include: [
                {
                    model: detalle,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO', 'Id_Enc_FK', 'Id_Prod_Fk'] },
                    include: [
                        {
                            model: Producto,
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
        const { ID_USER, MET_PAGO, TOTAL, TIPO_ENCABE, ID_PROD, CANTIDAD, PRECIO_U, LOTE_ID } = req.body;
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


            const encabezado = await Encabezados.create(data, { transaction: transaction })


            //creamos los detalles asociados a el encabezado

            const prod = await Producto.findByPk(ID_PROD);

            if (!prod) {
                return response(res, 404, 404, "Product not found");
            }
            const Id_Detalle = uniqid();

            const datosEnv = {
                Id_Detalle: Id_Detalle,
                Id_Enc_FK: ENC_ID,
                Id_Prod_Fk: ID_PROD,
                cantidad: CANTIDAD,
                Precio_U: PRECIO_U
            }
            await detalle.create(datosEnv, { transaction: transaction })

            let exist = await existencias.findOne({ where: { PRO_ID_FK: ID_PROD, ID_LOTE_FK: LOTE_ID } })
            let lote = await lotes.findByPk(LOTE_ID)
            if (!exist || !lote) {
                return response(res, 404, 404, 'Product is not registered in inventory or lote dont exist')

            } else {
                exist = exist.dataValues;

                if (TIPO_ENCABE == "1") { // Compra: agregamos cantidad del producto a la existencia y al inventario

                    // Actualizar existencias
                    await existencias.update(
                        { CANT_PROD: connection.literal(`CANT_PROD + ${CANTIDAD}`) }, // Utilizamos sequelize.literal para realizar una suma
                        { where: { PRO_ID_FK: ID_PROD, ID_LOTE_FK: LOTE_ID }, transaction: transaction }
                    );


                    // Actualizar inventario
                    const updatedInventoryRows = await Inventarios.update(
                        { CANT_TOTAL: connection.literal(`CANT_TOTAL + ${CANTIDAD}`) },
                        { where: { INV_ID: exist.INV_ID_FK }, transaction: transaction }
                    );


                    if (updatedInventoryRows[0] === 1) {
                        await transaction.commit();
                        response(res, 200)

                    } else {
                        await transaction.rollback();

                    }
                } else {

                    const exist = await existencias.findOne(
                        { where: { PRO_ID_FK: ID_PROD, ID_LOTE_FK: LOTE_ID }, transaction: transaction }
                    );

                    const {CANT_PROD} = exist.dataValues;

                    const cantRestante =  parseInt(CANT_PROD) - CANTIDAD;
                    
                    if(cantRestante >= 0){ //verificamos que exista la cantidad necesaria en el inventario para vender

                        // Actualizar existencias
                    await existencias.update(
                        { CANT_PROD: connection.literal(`CANT_PROD - ${CANTIDAD}`) },
                        { where: { PRO_ID_FK: ID_PROD, ID_LOTE_FK: LOTE_ID }, transaction: transaction }
                    );


                    // Actualizar inventario
                    const updatedInventoryRows = await Inventarios.update(
                        { CANT_TOTAL: connection.literal(`CANT_TOTAL - ${CANTIDAD}`) },
                        { where: { INV_ID: exist.INV_ID_FK }, transaction: transaction }
                    );


                    if (updatedInventoryRows[0] === 1) {
                        await transaction.commit();
                        response(res, 200)
                    } else {
                        await transaction.rollback();
                    }

                    }else{
                        response(res, 404, 404, 'Not enough product in inventory')
                    }

                    

                }
            }



        } else {

            response(res, 404, 404, "User not found");
        }

    } catch (err) {
        response(res, 500, 500, err);
        if (transaction) await transaction.rollback();
        console.error('Error al agregar datos:', err);
    }

}





