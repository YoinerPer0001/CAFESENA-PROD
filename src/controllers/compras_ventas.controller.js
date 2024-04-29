import Usuario from "../models/users.model.js";
import Producto from "../models/productos.models.js";
import detalle from "../models/detalles.model.js";
import { Encabezados } from "../models/encabezado.model.js";
import uniqid from 'uniqid';
import Inventarios from "../models/inventarios.model.js";
import { response } from "../utils/responses.js";
import { connection } from "../database/db.js";
import existencias from "../models/existencias.model.js";
import factura from "../models/factura.model.js";
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
    // ID_PROD, CANTIDAD, PRECIO_U,
    let transaction;
    try {
        const { ID_USER, MET_PAGO, TOTAL, LISTA_PROD, TIPO_ENCABE, LOTE_ID } = req.body;
        const datosEmpleado = req.Tokendata.user;
        const ENC_ID = uniqid();
    
        const usuario = await Usuario.findByPk(ID_USER);
    
        if (!usuario) {
            return response(res, 404, 404, "User not found");
        }
    
        const data = {
            ENC_ID: ENC_ID,
            FECH_ENC: Date.now(),
            MET_PAGO: MET_PAGO,
            TOTAL: TOTAL,
            ID_USER_FK: ID_USER,
            TIPO_ENCABE: TIPO_ENCABE
        };
    
        transaction = await connection.transaction(); //transaccion para poder guardar valores en ambas entidades
    
        const encabezado = await Encabezados.create(data, { transaction: transaction });
    
        // Verificamos que los productos estén registrados
        const arrProms = LISTA_PROD.map(producto => Producto.findByPk(producto.ID_PROD, { transaction: transaction }));
    
        const productos = await Promise.all(arrProms);
    
        productos.forEach(producto => {
            if (!producto) {
                return response(res, 404, 404, "product not found");
                // throw new Error("Product not found");
            }
        });
    
        await Promise.all(
            LISTA_PROD.map(async prod => {
                const Id_Detalle = uniqid();
    
                const datosEnv = {
                    Id_Detalle: Id_Detalle,
                    Id_Enc_FK: ENC_ID,
                    Id_Prod_Fk: prod.ID_PROD,
                    cantidad: prod.CANTIDAD,
                    Precio_U: prod.PRECIO_U
                };
    
                await detalle.create(datosEnv, { transaction: transaction });
    
                let exist = await existencias.findOne({ where: { PRO_ID_FK: prod.ID_PROD, ID_LOTE_FK: LOTE_ID } });
                let lote = await lotes.findByPk(LOTE_ID);
                if (!exist || !lote) {
                    throw new Error("Product is not registered in inventory or lote dont exist");
                } else {
                    exist = exist.dataValues;
    
                    if (TIPO_ENCABE == "1") { // Compra: agregamos cantidad del producto a la existencia y al inventario
                    
                          // Actualizar existencias
                          await existencias.update(
                            { CANT_PROD: connection.literal(`CANT_PROD + ${prod.CANTIDAD}`) }, // Utilizamos sequelize.literal para realizar una suma
                            { where: { PRO_ID_FK: prod.ID_PROD, ID_LOTE_FK: LOTE_ID }, transaction: transaction }
                        );


                        // Actualizar inventario
                        const updatedInventoryRows = await Inventarios.update(
                            { CANT_TOTAL: connection.literal(`CANT_TOTAL + ${prod.CANTIDAD}`) },
                            { where: { INV_ID: exist.INV_ID_FK }, transaction: transaction }
                        );

                    } else {
                        const exist = await existencias.findOne(
                            { where: { PRO_ID_FK: prod.ID_PROD, ID_LOTE_FK: LOTE_ID }, transaction: transaction }
                        );

                        const { CANT_PROD } = exist.dataValues;

                        const cantRestante = parseInt(CANT_PROD) - prod.CANTIDAD;

                        if (cantRestante >= 0) { //verificamos que exista la cantidad necesaria en el inventario para vender

                            // Actualizar existencias
                            await existencias.update(
                                { CANT_PROD: connection.literal(`CANT_PROD - ${prod.CANTIDAD}`) },
                                { where: { PRO_ID_FK: prod.ID_PROD, ID_LOTE_FK: LOTE_ID }, transaction: transaction }
                            );


                            // Actualizar inventario
                            const updatedInventoryRows = await Inventarios.update(
                                { CANT_TOTAL: connection.literal(`CANT_TOTAL - ${prod.CANTIDAD}`) },
                                { where: { INV_ID: exist.INV_ID_FK }, transaction: transaction }
                            );

                        }else{
                            return response(res, 404, 404, 'Not enough product in inventory')
                        }
                    }
                }
            })
        );

        //creamos la factura

        const dataFact = {
            FACT_ID: ENC_ID,
            FACT_FECH: Date.now(),
            ID_EMPLEADO: datosEmpleado.Id_User,
        }

        const createdFact = await factura.create(dataFact, {transaction:transaction});

    
        await transaction.commit();
        response(res, 200);
    } catch (err) {
        response(res, 500, 500, err);
        if (transaction) await transaction.rollback();
        console.error('Error al agregar datos:', err);
    }
    

}


// export const deleteCompras = () => {

// }




