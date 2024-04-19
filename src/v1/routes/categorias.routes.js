import express from "express";
import { GetCategories, createCategories, GetCategoriesxId, UpdateCategories } from "../../controllers/categorias.controller.js";
import { verifyToken} from "../../middlewares/verifyToken.js";
import { adminPermiso } from "../../middlewares/managePermissions.js";
import {validateCreate, validateUpdate} from "../../validators/categoria.validators.js";
import { deleteCat } from "../../controllers/categorias.controller.js"


const routesCategorias = express();

routesCategorias.get("/api/v1/categories", GetCategories);

routesCategorias.get("/api/v1/categories/:id", GetCategoriesxId);

routesCategorias.post("/api/v1/categories/create", validateCreate, verifyToken, adminPermiso, createCategories);

routesCategorias.put("/api/v1/categories/update/:id", validateUpdate, verifyToken, adminPermiso, UpdateCategories
);

routesCategorias.delete(
  "/api/v1/categories/deleted/:id",
  verifyToken,
  deleteCat
);
export default routesCategorias;
