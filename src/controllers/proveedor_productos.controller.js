import 'dotenv/config'
import { response } from "../utils/responses.js";
import proveedor_producto from "../models/proveedores_productos.model.js";
import uniqid from 'uniqid';
import Proveedor from '../models/proveedor.models.js';
import Producto from '../models/productos.models.js';

const atrbEclude = { exclude: ['createdAt', 'updatedAt'] };

//LISTAR PROVEEDORES DE UN PRODUCTO
export const getAllProvxProd = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (producto) {

            const data = await proveedor_producto.findAll({
                attributes: atrbEclude,
                include: [
                    {
                        model: Proveedor,
                        attributes: atrbEclude
                    },
                    // {
                    //     model: Producto,
                    //     attributes: atrbEclude
                    // }
                ],
                where: { Id_Prod_FK: id, ESTADO_REGISTRO: 1}//REGISTROS NO ELIMINADOS

            })
            if (data) {
                response(res, 200, 200, data)
            } else {
                response(res, 404, 404, 'not found')
            }
        } else {
            response(res, 404, 404, 'Product not found')
        }

    } catch (error) {
        response(res, 500, 500, error)
    }
}

//LISTAR PRODUCTOS DE UN PROVEEDOR
export const getAllProdxProv = async (req, res) => {
    try {
        const { id } = req.params;

        const proveedo = await Proveedor.findByPk(id);

        if (proveedo) {

            const data = await proveedor_producto.findAll({
                attributes: atrbEclude,
                include: [
                    {
                        model: Producto,
                        attributes: atrbEclude
                    },
                    // {
                    //     model: Proveedor,
                    //     attributes: atrbEclude
                    // }
                ],
                where: { Id_Prov_FK: id ,  ESTADO_REGISTRO: 1} //REGISTROS NO ELIMINADOS

            })
            if (data) {
                response(res, 200, 200, data)
            } else {
                response(res, 404, 404, 'not found')
            }
        } else {
            response(res, 404, 404, 'Provider not found')
        }

    } catch (error) {
        response(res, 500, 500, error)
    }
}

export const createProvProd = async (req, res) => {
    try {
        const Id_Prov_Prod = uniqid();
        const { Id_Prov, Id_Prod } = req.body;

        //verificamos que existan 
        const prov = await Proveedor.findByPk(Id_Prov);
        const prod = await Producto.findByPk(Id_Prod);

        if (!prov || !prod) {

            if (!prov) {
                return response(res, 404, 404, "Provider not found");
            } else {
                return response(res, 404, 404, "Product not found");
            }

        } else {

            //verificamos que no exista la asignacion
            const asignacionExist = await proveedor_producto.findOne({
                where: {

                    Id_Prov_FK: Id_Prov,
                    Id_Prod_FK: Id_Prod
                }
            })
            if (asignacionExist) {
                return response(res, 404, 404, "Already assigned")
            } else {
                const data = await proveedor_producto.create({
                    Id_Prov_Prod: Id_Prov_Prod,
                    Id_Prov_FK: Id_Prov,
                    Id_Prod_FK: Id_Prod
                })
                if (data) {
                    response(res, 200)
                } else {
                    response(res, 500, 500, 'Error creating')
                }
            }
        }

    } catch (err) {
        response(res, 500, 500, err)
    }
}

export const updateProvProd = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;
        let NewProv = null;
        let NewProd = null;

        let asignacionAnt = await proveedor_producto.findByPk(id);

        if (asignacionAnt) {
            asignacionAnt = asignacionAnt.dataValues;

            //verificamos que existan 
            if (datos.Id_Prov) {
                const prov = await Proveedor.findByPk(datos.Id_Prov);

                if (!prov) {
                    return response(res, 404, 404, "New Provider not found");
                } else {
                    NewProv = datos.Id_Prov;
                }
            }

            if (datos.Id_Prod) {
                const producto = await Producto.findByPk(datos.Id_Prod);
                if (!producto) {
                    return response(res, 404, 404, "New Product not found");
                } else {
                    NewProd = datos.Id_Prod;
                }
            }

            //verificamos que no exista la asignacion nueva
            const asignacionExist = await proveedor_producto.findOne({
                where: {

                    Id_Prov_FK: datos.Id_Prov || asignacionAnt.Id_Prov_FK,
                    Id_Prod_FK: datos.Id_Prod || asignacionAnt.Id_Prod_FK
                }
            })
            if (asignacionExist) {
                return response(res, 404, 404, "Already assigned")
            } else {

                const data = await proveedor_producto.update({
                    Id_Prov_FK: datos.Id_Prov,
                    Id_Prod_FK: datos.Id_Prod,
                }, {
                    where: {
                        Id_Prov_Prod: id
                    }
                })
                if (data) {
                    response(res, 200)
                } else {
                    response(res, 500, 500, 'Error updating')
                }
            }

        } else {
            response(res, 404, 404, 'Asignation Not found ')
        }


    } catch (err) {
        response(res, 500, 500, err)
    }
}

export const deleteProvProd = async (req, res) => {
    try {
        const { id } = req.params;

        const provPrd = await proveedor_producto.findByPk(id);

        if(provPrd){
            const deleted = await proveedor_producto.update(
                {ESTADO_REGISTRO: 0},
                {where: {Id_Prov_Prod: id}}
            )
            if (deleted) {
                response(res, 200)
            } else {
                response(res, 500, 500, 'Error deleting')
            }
        }else{
            response(res, 404, 404, 'Asignation Not found ')
        }

    }catch (err) {
        response(res, 500, 500, err)
    }
}