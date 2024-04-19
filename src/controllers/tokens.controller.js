import { response } from "../utils/responses.js";
import jsonwebtoken from 'jsonwebtoken'
import { adminPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config.js'
import Token from "../models/tokens.model.js";
import Usuario from "../models/users.model.js";
import { TokenDb } from "./users.controller.js";
import { GenCodigosTemp } from "../utils/GenCodTemp.js";
const jwt = jsonwebtoken;

export const GetAllTokens = async (req, res) => {

    try {

        const tokens = await Token.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
        if (tokens) {
            response(res, 200, 200, tokens);
        } else {
            response(res, 404, 404, 'Not found');
        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");

    }



}

//get  TOKENS by user id --ok 
export const GetTokenssxUser = async (req, res) => {

    try {
        const { id } = req.params;

        const user = await Usuario.findByPk(id);

        if (user) {
            const tokens = await Token.findOne({ where: { User_Id_FK: id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });

            if (tokens) {
                response(res, 200, 200, tokens);
            } else {
                response(res, 404, 404, 'Tokens not found');
            }
        } else {
            response(res, 404, 404, "User not found");
        }


    } catch (err) {

        response(res, 500, 500, "something went wrong");
    }


}

//get  TOKENS by type --ok 1: inicio Sesion, 2: verificacion Email, 3: recuperacion de contraseña, 4: Verificar IP
export const GetTokenssxTipo = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 500, 105, "Something went wrong");
        } else {

            try {
                //verify permissions
                const { Id_Rol_FK } = data.user;
                let adPermision = adminPermissions(Id_Rol_FK);

                if (adPermision) {
                    const { tipo } = req.params;

                    if (tipo) {

                        const tokens = await Token.findOne({ where: { Tipo_token: tipo } });

                        if (tokens) {
                            response(res, 200, 200, tokens);
                        } else {
                            response(res, 404, 404, tokens);
                        }
                    }

                }

            } catch (err) {

                response(res, 500, 500, "something went wrong");

            }


        }
    })

}

// Insert Tokens --ok
export const InsertToken = async (req, res) => {

    try {

        const { Id_User, Tipo_token } = req.body;
    
        //verificamos que exista el usuario
        let UserExists = await Usuario.findByPk(Id_User);

        if (!UserExists) {

            response(res, 404, 404, "User don't found");

        } else {

            let user = UserExists.dataValues;
            let datosEnv;
            let token;

            const userData = {
                Id_User: user.Id_User,
                Nom_User: user.Nom_User,
                Ape_User: user.Ape_User,
                Ema_User: user.Ema_User,
                Id_Rol_FK: user.Id_Rol_FK,
            }

            if (Tipo_token == 1) {

                token = await TokenDb(userData)

                const tokendecode = jwt.decode(token, process.env.SECRETWORD);

                //create tokens
                datosEnv = {
                    Token: token,
                    Fec_Caducidad: tokendecode.exp,
                    User_Id_FK: Id_User,
                    Tipo_token: Tipo_token
                }

            } else {
                const { codigo, exp } = await GenCodigosTemp(600);

                datosEnv = {
                    Token: codigo,
                    Fec_Caducidad: exp,
                    User_Id_FK: Id_User,
                    Tipo_token: Tipo_token
                }
            }



            const newToken = await Token.create(datosEnv);
            if (newToken) {
                response(res, 200);
            } else {
                response(res, 500, 500, "error creating token");
            }

        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");
    }

}

//update Tokens --ok
export const UpdateTokens = async (req, res) => {

        try {

                //Data
                const { id } = req.params;
                const datos = req.body;
                let datosEnv;

                //verify token exist
                let token = await Token.findByPk(id)

                if (!token) {

                    response(res, 404, 404, "Token not found");

                } else {
                    token = token.dataValues;

                    //user verify exist
                    if (datos.Id_User) {

                        const userExist = await Usuario.findByPk(datos.Id_User);
                        if (!userExist) {

                            response(res, 500, 103, "User don't exist");

                        } else {

                            datosEnv = {
                                Token: token.Token,
                                User_Id_FK: datos.Id_User,
                                Fec_Caducidad: token.Fec_Caducidad,
                                Tipo_token: datos.Tipo_token || token.Tipo_token
                            }

                            const responses = await Token.update(datosEnv, { where: { Id_Token: id } })
                            if (responses) {
                                response(res, 200, 200);
                            }

                        }

                    } else {

                        datosEnv = {
                            Id_Token: id,
                            Token: datos.Token || token.Token,
                            User_Id_FK: datos.Id_User || token.Id_User_FK,
                            Fec_Caducidad: datos.Fec_Caducidad || token.Fec_Caducidad,
                            Tipo_token: datos.Tipo_token || token.Tipo_token
                        }

                        const responses = await Token.update(datosEnv, { where: { Id_Token: id } })

                        if (responses) {
                            response(res, 200, 200);
                        }

                    }

                }

        } catch (err) {

            response(res, 500, 500, "something went wrong");
        }
}