import Role from '../models/roles.model.js';
import 'dotenv/config'
import { response } from '../utils/responses.js';
import Usuario from '../models/users.model.js';


//get all roles
export const GetRoles = async (req, res) => {

    try {
        const roles = await Role.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] },
            where: { ESTADO_REGISTRO: 1 } // REGISTROS ACTIVOS
        });

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

        const roles = await Role.findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt', 'ESTADO_REGISTRO'] }, });

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
        const rolExists = await Role.findOne({ where: { Nom_Rol: Nom_Rol, ESTADO_REGISTRO: 1 } })


        if (rolExists) {

            return response(res, 409, 409, "rol already exist");

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

            if (datos.Nom_Rol) {
                const rolExists = await Role.findOne({ where: { Nom_Rol: datos.Nom_Rol, ESTADO_REGISTRO: 1 } })

                if (rolExists) {

                    return response(res, 409, 409, "New rol already exist");
                } else {
                    datosEnv = {

                        Nom_Rol: datos.Nom_Rol,
                        ESTADO_REGISTRO: datos.ESTADO_REGISTRO || roles.ESTADO_REGISTRO
                    }

                }
            } else {
                datosEnv = {

                    Nom_Rol: datos.Nom_Rol || roles.Nom_Rol,
                    ESTADO_REGISTRO: datos.ESTADO_REGISTRO || roles.ESTADO_REGISTRO
                }

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

export const deleteRol = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await Role.findByPk(id);
        if (!rol) {
            return response(res, 404, 404, "Rol don't exist");

        } else {

            //verificamos que no tenga usuarios asociados
            const usuarios = await Usuario.findAll({ where: { Id_Rol_FK: id } })

            if (usuarios) {
                return response(res, 403, 403, "You cannot delete this rol, because has users associated")
            } else {

                const responses = await Role.update({ ESTADO_REGISTRO: false }, { where: { Id_Rol: id } })
                if (responses) {
                    response(res, 200)
                } else {
                    response(res, 500, 500, "Error Deleting")
                }

            }

           

        }

    } catch (err) {

        response(res, 500, 500, err);
    }
}