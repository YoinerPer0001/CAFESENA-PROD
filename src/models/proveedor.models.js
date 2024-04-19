import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";



const Proveedor = connection.define('Proveedor', {
   
    PROV_ID: {
      type: DataTypes.STRING,
      autoIncrement:true,
      allowNull: false,
      primaryKey:true,

    },
    PROV_NOM: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
      PROV_CONTACTO: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      PROV_EST: {
        type: DataTypes.CHAR,
        allowNull: false,
        defaultValue: "A"
      }
      
  });


  export default Proveedor;