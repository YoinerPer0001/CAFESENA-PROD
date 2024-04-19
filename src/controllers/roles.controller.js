import Role from '../models/roles.model.js';
import { adminPermissions } from '../utils/manage.permissions.js';
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config'
import { response } from '../utils/responses.js';
const jwt = jsonwebtoken;



//get all roles
export const GetRoles = async (req, res) => {

    try {
        const roles = await Role.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

        if (roles) {
            response(res, 200, 200, roles);
        } else {
            response(res, 404, 404, 'Not Found');
        }

    } catch (error) {

        response(res, 500, 500, "something went wrong");

    }

}

//get  roles by id
export const GetRolesxId = async (req, res) => {

    try {
        const { id } = req.params;

        const roles = await Role.findByPk(id);

        if (roles) {
            response(res, 200, 200, roles);
        } else {
            response(res, 404, 404, roles);
        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");
    }

}

// create roles
export const createRoles = async (req, res) => {


    try {
        const { Nom_Rol } = req.body;

        //verificamos que no exista un rol con el mismo nombre
        const rolExists = await Role.findOne({ where: { Nom_Rol: Nom_Rol } })


        if (rolExists) {

            response(res, 409, 409, "rol already exist");

        } else {

            //create a rol
            const datos = {
                Nom_Rol: Nom_Rol.toLowerCase()
            }

            const newRol = await Role.create(datos);

            if (newRol) {
                response(res, 200)
            } else {
                response(res, 500, 500, "Error creating")
            }


        }
    } catch (err) {
        response(res, 500, 500, "something went wrong");
    }
}
// //update roles
export const UpdateRoles = async (req, res) => {

    try {
        //Data
        const { id } = req.params;
        const datos = req.body;

        //verify exist ROL
        let datosEnv;
        let roles = await Role.findByPk(id)

        if (!roles) {
            response(res, 404, 404, "Rol don't exist");

        } else {
            roles = roles.dataValues;

            datosEnv = {

                Nom_Rol: datos.Nom_Rol || roles.Nom_Rol
            }


            const responses = await Role.update(datosEnv, { where: { Id_Rol: id } })
            if (responses) {
                response(res, 200)
            } else {
                response(res, 500, 500, "Error updating")
            }
        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");

    }

}