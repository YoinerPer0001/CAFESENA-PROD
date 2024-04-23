import 'dotenv/config'
import { response } from "../utils/responses.js";
import Producto from "../models/productos.models.js";
import Categorias from "../models/categorias.model.js";
import detalle from "../models/detalles.model.js";
import proveedor_producto from "../models/proveedores_productos.model.js";
import uniqid from 'uniqid';
import { connection } from '../database/db.js';
import Proveedor from '../models/proveedor.models.js';
import lotes from '../models/lotes.model.js';
import existencias from '../models/existencias.model.js';

// get all productos from response object
export const GetProductos = async (req, res) => {

    try {

        const data = await Producto.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] },
            include: [
                {
                    model: Categorias,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] }
                }
            ],
            where: { ESTADO_REGISTRO: 1 },//REGISTROS NO ELIMINADOS
        })

        if (data) {
            response(res, 200, 200, data)
        } else {
            response(res, 404)
        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");

    }

}

// get all productos from response object
export const GetProductosId = async (req, res) => {

    try {
        const { id } = req.params;

        const data = await Producto.findByPk(id,
            {
                attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] },
                include: [
                    {
                        model: Categorias,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] },

                    }
                ]


            })

        if (data) {
            response(res, 200, 200, data)
        } else {
            response(res, 404)
        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");

    }

}


export const createProducts = async (req, res) => {

    try {

        let transaccion;

        const PROD_ID = uniqid();

        const { CAT_ID_FK, PROD_NOM, PROD_DESC, PROD_PREC, PROD_COD, ID_LOTE, INV_ID, ID_PROV } = req.body;

        const productsExis = await Producto.findOne({ where: { PROD_COD: PROD_COD } });
        const catExist = await Categorias.findByPk(CAT_ID_FK);

        if (productsExis || !catExist) {

            if (productsExis) {
                return response(res, 409, 409, "products already exist");
            } else {
                return response(res, 404, 404, "category don't exist");
            }

        } else {
            transaccion = await connection.transaction();

            //create prod
            const dataPro = {
                PROD_ID: PROD_ID,
                PROD_COD: PROD_COD,
                PROD_NOM: PROD_NOM,
                PROD_DESC: PROD_DESC,
                PROD_PREC: PROD_PREC,
                CAT_ID_FK: CAT_ID_FK
            }

            const nuevoProducts = await Producto.create(dataPro, { transaction: transaccion });

            //Asignamos el producto al proveedor

            const proveedor = await Proveedor.findByPk(ID_PROV);
            if (!proveedor) {
                return response(res, 404, 404, 'Provider not found')
            } else {
                const Id_Prov_Prod = uniqid();
                const data = await proveedor_producto.create({
                    Id_Prov_Prod: Id_Prov_Prod,
                    Id_Prov_FK: ID_PROV,
                    Id_Prod_FK: PROD_ID
                }, { transaction: transaccion })
            }

            //creamos la existencia

            const lote = await lotes.findByPk(ID_LOTE)
            const prov = await Proveedor.findByPk(ID_PROV)
            if (!lote || !prov) {

                return response(res, 404, 404, 'Lote and Provider not found')

            } else {

                const dataInv = {
                    PRO_ID_FK: PROD_ID,
                    INV_ID_FK: INV_ID,
                    ID_LOTE_FK: ID_LOTE,
                    CANT_PROD: 0
                }

                const existencia = await existencias.create(dataInv, { transaction: transaccion })

                await transaccion.commit();

                response(res, 200)
            }


        }

    } catch (err) {
        response(res, 500, 500, err);
        if (transaccion) await transaccion.rollback(); // Corrección aquí
        console.error('Error al agregar datos:', err);


    }

}


export const updateProductos = async (req, res) => {

    try {
        const { id } = req.params;
        const datos = req.body;
        let dataPro;
        let producto = await Producto.findByPk(id)

        if (producto) {

            producto = producto.dataValues;

            if (datos.CAT_ID_FK) {
                const catExist = await Categorias.findByPk(datos.CAT_ID_FK)
                if (!catExist) {
                    response(res, 404, 404, "Category not found")
                } else {

                    dataPro = {
                        PROD_NOM: datos.PROD_NOM || producto.PROD_NOM,
                        PROD_DESC: datos.PROD_DESC || producto.PROD_DESC,
                        PROD_PREC: datos.PROD_PREC || producto.PROD_PREC,
                        PROD_COD: datos.PROD_COD || producto.PROD_COD,
                        CAT_ID_FK: datos.CAT_ID_FK || producto.CAT_ID_FK,
                        ESTADO_REGISTRO: datos.ESTADO_REGISTRO || producto.ESTADO_REGISTRO
                    }

                }

            } else {

                dataPro = {
                    PROD_NOM: datos.PROD_NOM || producto.PROD_NOM,
                    PROD_DESC: datos.PROD_DESC || producto.PROD_DESC,
                    PROD_PREC: datos.PROD_PREC || producto.PROD_PREC,
                    PROD_COD: datos.PROD_COD || producto.PROD_COD,
                    ESTADO_REGISTRO: datos.ESTADO_REGISTRO || producto.ESTADO_REGISTRO
                }

            }

            const updateProductos = await Producto.update(dataPro, { where: { PROD_ID: id } })
            if (updateProductos) {
                response(res, 200);
            } else {
                response(res, 500, 500, "Error updating")
            }
        } else {
            response(res, 404, 404, "Product not found")
        }


    } catch (err) {
        response(res, 500, 500, "something went wrong");
    }


}

export const deleteProductos = async (req, res) => {

    try {

        const { id } = req.params;

        const producto = await Producto.findByPk(id)

        if (producto) {

            //verificamos que no tenga detalles asociados o proveedores asociados
            const detalles = await detalle.findAll({ where: { Id_Prod_Fk: id } })

            //verificamos que no tenga proveedores asociados
            const proveedores = await proveedor_producto.findAll({ where: { Id_Prod_FK: id } })

            if (detalles || proveedores) {
                if (detalles && proveedores) {
                    return response(res, 403, 403, "You cannot delete this product, because has details and providers associated")
                } else if (detalles && !proveedores) {
                    return response(res, 403, 403, "You cannot delete this product, because has details associated")
                } else {
                    return response(res, 403, 403, "You cannot delete this product, because has providers associated")
                }
            } else {

                const responses = await Producto.update(
                    { ESTADO_REGISTRO: 0 },
                    { where: { PROD_ID: id } }
                )

                if (responses) {
                    response(res, 200);
                } else {
                    response(res, 500, 500, "Error updating")
                }

            }

        } else {
            response(res, 404, 404, 'Product not found');
        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");

    }
}

