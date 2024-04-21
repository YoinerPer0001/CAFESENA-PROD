import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";
import Producto from "./productos.models.js";


const Categorias = connection.define('Categorias', {
   
    Id_Cat: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      allowNull: false,
      primaryKey:true,

    },
    Nom_Cat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ESTADO_REGISTRO:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });

  Categorias.hasMany(Producto,{foreignKey: 'CAT_ID_FK'})
  Producto.belongsTo(Categorias,{foreignKey: 'CAT_ID_FK', targetKey:'Id_Cat'})

  export default Categorias;