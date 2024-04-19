
import { adminPermissions } from '../utils/manage.permissions.js';
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config'
import { response } from '../utils/responses.js';
import Localizacion from '../models/localizacion.model.js';
import Usuario from '../models/users.model.js';

const jwt = jsonwebtoken;



//get all localizaciones
export const GetLocations = async (req, res) => {

    try {
        const locations = await Localizacion.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

        if (locations) {
            response(res, 200, 200, locations);
        } else {
            response(res, 404, 404, 'locations not found');
        }

    } catch (error) {

        response(res, 500, 500, "something went wrong");

    }

}

//get  locations by user id
export const GetLocationsxUser = async (req, res) => {

    try {
        const { id } = req.params;

        //verify exist user
        const user = await Usuario.findByPk(id)

        if (!user) {

            response(res, 404, 404, "user don't found");

        } else {

            const locations = await Localizacion.findOne({ where: { Id_User_FK: id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });

            if (locations) {
                response(res, 200, 200, locations);
            } else {
                response(res, 404, 404, 'locations not found');
            }
        }

    } catch (err) {
        if (err.errno) {

            response(res, 400, err.errno, err.code);

        } else {
            response(res, 500, 500, "something went wrong");

        }
    }

}

// create locations
export const createLocations = async (req, res) => {

    try {
        const { Dir_Ip, Id_User } = req.body;

        //verificamos que exista el usuario
        const UserExists = await Usuario.findByPk(Id_User)


        if (!UserExists) {

            response(res, 404, 404, "User don't found");

        } else {

            //create category
            const datos = {
                Dir_Ip: Dir_Ip,
                Id_User_FK: Id_User
            }

            const newLocation = await Localizacion.create(datos);
            if (newLocation) {
                response(res, 200, 200);
            } else {
                response(res, 500, 500, 'Error creating');
            }


        }


    } catch (err) {

        response(res, 500, 500, "something went wrong");

    }
}

// //update locations
export const UpdateLocations = async (req, res) => {

    try {

        //Data
        const { id } = req.params;
        const datos = req.body;

        //verify exist location
        let datosEnv;
        let location = await Localizacion.findByPk(id)

        if (!location) {

            response(res, 404, 404, "location don't found");

        } else {
            
            location = location.dataValues;
            //user verify exist
            if (datos.Id_User) {

                const userExist = await Usuario.findByPk(datos.Id_User);

                if (!userExist) {

                    response(res, 404, 404, "User don't found");

                } else {

                    datosEnv = {

                        Dir_Ip: datos.Dir_Ip || location.Dir_Ip,
                        Id_User_FK: datos.Id_User
                    }

                    const responses = await Localizacion.update(datosEnv, { where: { Id_Loc: id } })
                    if (responses) {
                        response(res, 200, 200);
                    } else {
                        response(res, 500, 500, 'Error updating');
                    }

                }

            } else {

                datosEnv = {

                    Dir_Ip: datos.Dir_Ip || location.Dir_Ip,
                    Id_User_FK: datos.Id_User || location.Id_User_FK
                }

                const responses = await Localizacion.update(datosEnv, { where: { Id_Loc: id } })

                if (responses) {
                    response(res, 200, 200);
                } else {
                    response(res, 500, 500, 'Error updating');
                }

            }

        }

    } catch (err) {

        response(res, 500, 500,err);

    }

}