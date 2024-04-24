import jsonwebtoken from 'jsonwebtoken';
import {response} from '../utils/responses.js'
import Token from '../models/tokens.model.js';
const jwt = jsonwebtoken;

export const verifyToken = async (req, res, next) => {
    try {
        let bearerHeader = req.headers['authorization'];
        let token = req.params.token;
        
        if (token) {

            const bearerToken = token;

            const decodetoken = jwt.decode(bearerToken, { complete: true })

            const fechaActual = Math.floor(Date.now() / 1000);

            if (fechaActual > decodetoken.payload.exp) {

                response(res,401,401,"Expired token");
            }else{

                req.token = bearerToken;
                next();
            }

           

        } else if (typeof bearerHeader !== "undefined") {

            
            const bearerToken = bearerHeader.split(' ')[1];


            const decodetoken = jwt.decode(bearerToken, { complete: true })

            const fechaActual = Math.floor(Date.now() / 1000);

            if (fechaActual > decodetoken.payload.exp) {
                response(res,401,401,"Expired token");
            }else{
                req.token = bearerToken;

                jwt.verify(bearerToken, process.env.SECRETWORD || 'juniorTupapa',async (err,data)=>{
                    if(err){
                        response(res,401,401,"Token Error");
                    }else{
                        const {Id_User} = decodetoken.payload.user;
        
                        let estReg = await Token.findOne({where:{token:bearerToken, User_Id_FK: Id_User}});
                        
                        if(estReg){
                            const {ESTADO_REGISTRO} = estReg.dataValues; 
                            if(ESTADO_REGISTRO ){
                                req.Tokendata = data;
                           
                                next();
                                
                            }else{
                                response(res,401,401,"Expired token, because logout");
                            }
                            
                        }else{
                            response(res,401,401,"Expired token, because logout");
                        }
                        
                    }
                });
            
            }

           

        } else {
            
            response(res,401,401,"invalid token");
        }
    } catch (error) {

        response(res,401,401,"invalid token");
    }
}