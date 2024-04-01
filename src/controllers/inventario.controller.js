import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config';
import { adminPermissions, EmplPermissions } from "../utils/manage.permissions.js";
import { response } from "../utils/responses.js";
import Inventarios  from "../models/inventarios.model.js";
import uniqid from 'uniqid';

const jwt = jsonwebtoken;

//get all inventario
export const GetInventarios = async (req, res) => {

    try {

        const data = await Inventarios.findAll()
        if(data){
            response(res, 200, 200, data);
        }
        else{
            response(res, 404, 404, "No se encontraron inventarios");
        }


    } catch (error) {
        response(res, 500, 500, error);

      
        
        
    }

}

export const createInventario = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
            console.log(err);
        } else {

            try {

                const INV_ID = uniqid();

                const { PROD_ID_FK, PROD_CANT,INV_EST, } = req.body;

                if (!PROD_ID_FK) {
                    response(res, 400, 102, "Something went wrong");

                } else {

                    //verify user permissions
                    const adminPermiso = adminPermissions(data.user.Id_Rol_FK);

                    if (!adminPermiso) {

                        response(res, 403, 403, "you dont have permissions");
                    } else {

                        //verificamos que no exista una categoria con el mismo nombre
                        const dataInventario = await Inventarios.findOne({ where: { INV_ID: INV_ID } })


                        if (dataInventario) {

                            response(res, 500, 107, "Inventario already exist");

                        } else {

                            //create category
                            const data = {
                                INV_ID:INV_ID ,
                                PROD_ID_FK:PROD_ID_FK,
                                PROD_CANT:PROD_CANT,
                                INV_EST:INV_EST,
                            }

                            const newInventario = await Inventarios.create(data);
                            if (newInventario) {
                                response(res, 200)
                            } else {
                                response(res, 500, 500, "Error creating")
                            }

                        }
                    }
                }
            } catch (err) {

                response(res, 500, 500, "something went wrong");
                console.log(err)
            }


        }
    })
}

export const UpdateInventarios = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {
            response(res, 400, 105, "Something went wrong");
        } else {

            try {
                const { Id_Rol_FK } = dat.user;

                let adPermision = adminPermissions(Id_Rol_FK);


                if (adPermision) {

                    //Data
                    const { id } = req.params;
                    const { PROD_ID_FK, PROD_CANT,INV_EST, } = req.body;
                    //verify exist category

                    const inventario = await Inventarios.findByPk(id)

                    if (!inventario) {

                        response(res, 404, 404, "Inventario don't exist");

                    } else {

                        const data = {
                            PROD_ID_FK:PROD_ID_FK,
                            PROD_CANT:PROD_CANT,
                            INV_EST:INV_EST,
                        }

                        const responses = await inventario.update(data,{where:{INV_ID: id}})
                        
                        if(responses){
                            response(res, 200)
                        }else{
                            response(res, 500, 500, "Error updating")
                        }

                    }

                } else {
                    response(res, 401, 401, "You don't have permissions");
                }

            } catch (err) {

                    response(res, 500, 500, "something went wrong");
                    console.log(err)
                
            }
        }


    })
}