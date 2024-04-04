import jsonwebtoken from "jsonwebtoken"
import { adminPermissions } from "../utils/manage.permissions.js";

import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";
import { Encabezados } from "../models/encabezado.model.js";
import Usuario from "../models/users.model.js";


const jwt = jsonwebtoken;

//obtiene encabezados por tipo 1:compra, 2:ventas
export const GetxType = async (req, res, next) =>{

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

