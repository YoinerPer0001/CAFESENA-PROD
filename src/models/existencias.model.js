import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";
import Producto from "./productos.models.js";


const existencias = connection.define('existencias', {
    EX_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    PRO_ID_FK: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    INV_ID_FK: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ID_LOTE_FK: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CANT_PROD:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ESTADO_REGISTRO: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:1
    }
})


export default existencias;