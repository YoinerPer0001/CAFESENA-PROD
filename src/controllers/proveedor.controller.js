import jsonwebtoken from "jsonwebtoken";
import { adminPermissions, EmplPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config'
import { response } from "../utils/responses.js";
import Proveedor from "../models/proveedor.models.js"
import uniqid from 'uniqid';


const jwt = jsonwebtoken

//get all categories
export const getProveedor = async (req, res) => {

    try {

        const data = await Proveedor.findAll()
        if(data){
            response(res, 200, 200, data);
        }
        else{
            response(res, 404, 404, "No se encontraron proveedores")
        }


    } catch (error) {
        response(res, 500, 500, error);    
    }
}

export const createProveedor = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        } else {

            try {

                const PROV_ID = uniqid();

                const { PROV_NOM, PROV_CONTACTO,PROV_EST } = req.body;

                if (!PROV_NOM) {
                    response(res, 400, 102, "Something went wrong");

                } else {

                    //verify user permissions
                    const adminPermiso = adminPermissions(data.user.Id_Rol_FK);

                    if (!adminPermiso) {

                        response(res, 403, 403, "you dont have permissions");
                    } else {

                        //verificamos que no exista una categoria con el mismo nombre
                        const proveedorData = await Proveedor.findOne({ where: { PROV_ID: PROV_ID } })


                        if (proveedorData) {

                            response(res, 500, 107, "proveedor already exist");

                        } else {

                            //create category
                            const data = {
                                PROV_ID: PROV_ID,
                                PROV_NOM:PROV_NOM,
                                PROV_CONTACTO: PROV_CONTACTO,
                                PROV_EST:PROV_EST
                            }

                            const newProveedor = await Proveedor.create(data);
                            if (newProveedor) {
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






export const UpdateProveedor = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {
            response(res, 400, 105, "Something went wrong");
        } else {

            try {
                const PROV_ID = uniqid();
                const { Id_Rol_FK } = dat.user;

                let adPermision = adminPermissions(Id_Rol_FK);


                if (adPermision) {

                    //Data
                    const { id } = req.params;
                    const { PROV_NOM, PROV_CONTACTO,PROV_EST } = req.body;

                    //verify exist proveedor

                    const proveedor = await Proveedor.findByPk(id)

                    if (!proveedor) {

                        response(res, 404, 404, "Proveedor don't exist");

                    } else {

                        const data = {
                            PROV_NOM:PROV_NOM,
                            PROV_CONTACTO:PROV_CONTACTO,
                            PROV_EST:PROV_EST,
                        }

                        const responses = await Proveedor.update(data,{where:{PROV_ID: id}})
                        
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



export const deleteProveedor = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, datos) => {
        if (err) {
            response(res, 400, 105, "Something went wrong");
        }
        try {

            const { id } = req.params;
            const { Id_Rol_FK } = datos.user;
            const permiso = adminPermissions(Id_Rol_FK);


            if (!permiso) {
                response(res, 401, 401, "You don't have permissions");

            }
            const proveedor = await getProvID(id)
            if (proveedor.length > 0) {
                const responses = await deleteProveedor(id)

                response(res, 200, 200, responses);
            } else {
                response(res, 200, 204, proveedor);
            }


        } catch (err) {

            if (err.errno) {

                response(res, 400, err.errno, err.code);

            } else {
                response(res, 500, 500, "something went wrong");

            }
        }
    })
}