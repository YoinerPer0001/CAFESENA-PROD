import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";
import Proveedor from "./proveedor.models.js";
import Producto from "./productos.models.js";

const proveedor_producto = connection.define('proveedor_producto',{
    Id_Prov_Prod:{
        type:DataTypes.STRING,
        allowNull: false,
        primaryKey:true,
    },
    Id_Prov_FK:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Id_Prod_FK:{
        type:DataTypes.STRING,
        allowNull:false,
      
    }
})

Proveedor.hasMany(proveedor_producto, {foreignKey:'Id_Prov_FK'})
proveedor_producto.belongsTo(Proveedor, {foreignKey:'Id_Prov_FK', targetKey:'PROV_ID'})

Producto.hasMany(proveedor_producto, {foreignKey:'Id_Prod_FK'})
proveedor_producto.belongsTo(Producto, {foreignKey:'Id_Prod_FK', targetKey:'PROD_ID'})

export default proveedor_producto;