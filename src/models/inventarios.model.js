import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";
import Producto from "./productos.models.js";
import existencias from "./existencias.model.js";


const Inventarios = connection.define('inventario', {

  INV_ID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,

  },
  
  CANT_TOTAL: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  INV_EST: {
    type: DataTypes.CHAR,
    allowNull: false,
    defaultValue: 'S'
  },
  ESTADO_REGISTRO:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

Inventarios.hasMany(existencias, { foreignKey: 'INV_ID_FK', targetKey: 'INV_ID'})
existencias.belongsTo(Inventarios, { foreignKey: 'INV_ID_FK' })

export default Inventarios;