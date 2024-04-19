import jsonwebtoken from "jsonwebtoken"
import { adminPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Encabezados } from "../models/encabezado.model.js";
import Usuario from "../models/users.model.js";


const jwt = jsonwebtoken;
//obtiene encabezados 
export const GetAll = async (req, res) =>{
    jwt.verify(req.token, process.env.SECRETWORD,async (err,data)=>{
        if(err){
            response(res, 401, 401, "Token Error");
        }else{

            const encabezados = await Encabezados.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })
            if(encabezados){
                response(res, 200, 200 ,encabezados)
            }else{
                response(res, 404, 404, "not found");
            } 

        }
    })
}

//obtiene encabezados por tipo 1:compra, 2:ventas
export const GetxType = async (req, res) =>{

    jwt.verify(req.token, process.env.SECRETWORD,async (err,data)=>{
        if(err){
            response(res, 401, 401, "Token Error");
        }else{

            const encabezados = await Encabezados.findAll({where:{TIPO_ENCABE: req.params.type}})
            if(encabezados){
                response(res, 200, 200 ,encabezados)
            }else{
                response(res, 404, 404, "not found");
            } 

        }
    })
}

//crear encabezados
export const createEncabezado = async (req,res)=>{
    jwt.verify(req.token, process.env.SECRETWORD, async (err,data)=>{
        if(err){
            response(res, 401, 401, "Token Error");
        }else{
            const datos = req.body;
            const ENC_ID = uniqid();
            const usuario = await Usuario.findByPk(datos.ID_USER_FK);
            if(usuario){
                const data ={
                    ENC_ID: ENC_ID,
                    FECH_ENC:datos.FECH_ENC,
                    MET_PAGO:datos.MET_PAGO,
                    TOTAL: datos.TOTAL,
                    ID_USER_FK: datos.ID_USER_FK,
                    TIPO_ENCABE: datos.TIPO_ENCABE
                }
                const encabezado = await Encabezados.create(data)

                if(encabezado){
                    response(res, 200)
                }else{
                    response(res, 500, 500, "Error creating")
                }
            }else{
                response(res, 404, 404, "User not found");
            }
            
        }
    })
}

//actualizar informacion del encabezado

export const UpdateEncabezado = async (req, res) => {

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
                    const { PROD_ID_FK, FECH_ENC, MET_PAGO, TOTAL, TIPO_ENCABE } = req.body;
                    //verify exist category

                    const Encabezado = await Encabezados.findByPk(id)

                    if (!Encabezados) {

                        response(res, 404, 404, "encabezado don't exist");

                    } else {

                        const data = {
                            PROD_ID_FK:PROD_ID_FK,
                            FECH_ENC:FECH_ENC,
                            MET_PAGO:MET_PAGO,
                            TOTAL:TOTAL,
                            TIPO_ENCABE:TIPO_ENCABE,
                        }

                        const responses = await Encabezado.update(data,{where:{INV_ID: id}})
                        
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