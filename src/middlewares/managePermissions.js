import {response} from '../utils/responses.js'

export const adminPermiso = async (req, res, next) => {
    const {Id_Rol_FK}= req.Tokendata.user;

    if(Id_Rol_FK === 1){
        next();
    }else{
        response(res, 403,403, "you don't have permissions")
    }
}

export const EmplPermissions = async (req, res, next) => {
    const {Id_Rol_FK}= req.Tokendata.user;

    if(Id_Rol_FK === 2){
        next();
    }else{
        response(res, 403,403, "you don't have permissions")
    }
}

export const AdminEmplPermissions = async (req, res, next) => {
    const {Id_Rol_FK}= req.Tokendata.user;

    if(Id_Rol_FK === 1 || Id_Rol_FK === 2){
        next();
    }else{
        response(res, 403,403, "you don't have permissions")
    }
}

