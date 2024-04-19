import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";
import Producto from "./productos.models.js";


 const Inventarios = connection.define('inventario', {
   
    INV_ID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,

    },
    PROD_ID_FK: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PROD_CANT: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      INV_EST: {
        type: DataTypes.CHAR,
        allowNull: false,
      }
  });

  Inventarios.belongsTo(Inventarios,{foreignKey: 'PROD_ID_FK'})

  export default Inventarios;