import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";
import existencias from "./existencias.model.js";


const Producto = connection.define('producto', {
   
    PROD_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true,
    },
    PROD_COD: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PROD_NOM: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PROD_DESC: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    PROD_PREC:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:null,
    },
    CAT_ID_FK:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
     ESTADO_REGISTRO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
  }
    // Other model options go here
  });

  Producto.hasMany(existencias, {foreignKey:'PRO_ID_FK'})
  existencias.belongsTo(Producto,{foreignKey :'PRO_ID_FK', targetKey: 'PROD_ID'})

  export default Producto;


