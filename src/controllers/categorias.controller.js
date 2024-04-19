import jsonwebtoken from "jsonwebtoken"
import { adminPermissions } from "../utils/manage.permissions.js";
import Categorias from "../models/categorias.model.js";
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";


const jwt = jsonwebtoken;

//get all categories actives
export const GetCategories = async (req, res) => {

    try {
        const datos_activos = await Categorias.findAll({
            where: {activo: true}, attributes: {exclude:['createdAt','updatedAt']}
        })
        if (datos_activos) {
            response(res, 200, 200, datos_activos);
        } else {
            response(res, 404, 404, 'categories not found');
        }

    } catch (error) {
        response(res, 500, 500, error);
    }

}

//get  category by id
export const GetCategoriesxId = async (req, res) => {

    try {
        const { id } = req.params;

        const categoria = await Categorias.findByPk(id, { attributes: {exclude:['createdAt','updatedAt']}})

        if (categoria) {
            response(res, 200, 200, categoria);
        } else {
            response(res, 404, 404, ' category not found');
        }


    } catch (err) {
        response(res, 500, 500, "something went wrong");
    }

}

// create categories
export const createCategories = async (req, res) => {
    try {
        const data = req.Tokendata;
        const Id_Cat = uniqid();

        const { Nom_Cat } = req.body;

        //verificamos que no exista una categoria con el mismo nombre
        const categoriaExists = await Categorias.findOne({ where: { Nom_Cat: Nom_Cat } })

        if (categoriaExists) {

            response(res, 409, 409, "category already exist");

        } else {

            //create category
            const datos = {
                Id_Cat: Id_Cat,
                Nom_Cat: Nom_Cat.toLowerCase()
            }

            const newCategory = await Categorias.create(datos);
            if (newCategory) {
                response(res, 200)
            } else {
                response(res, 500, 500, "Error creating")
            }

        }

    } catch (err) {

        response(res, 500, 500, err);

    }
}

//update categorias
export const UpdateCategories = async (req, res) => {

    try {
        //Data
        const { id } = req.params;

        const datos = req.body;

        //verify exist category

        let category = await Categorias.findByPk(id)
        
        if (!category) {

            response(res, 404, 404, "Category don't exist");

        } else {
            category = category.dataValues;
            
            //verificamos que no exista una categoria con el mismo nombre
            
            const categoriaExists = await Categorias.findOne({ where: { Nom_Cat: datos.Nom_Cat.toLowerCase() } })
           
            if (categoriaExists) {
                response(res, 409, 409, "New category already registered");
            } else {
                
                const datosEnv = {

                    Nom_Cat: datos.Nom_Cat || category.Nom_Cat
                
                }
                console.log(datos)
                
                const responses = await Categorias.update(datosEnv, { where: { Id_Cat: id } })

                if (responses) {
                    response(res, 200)
                } else {
                    response(res, 500, 500, "Error updating")
                }
            }

        }


    } catch (err) {

        response(res, 500, 500, err);

    }
}

export const deleteCat = async (req, res) => {
 
}