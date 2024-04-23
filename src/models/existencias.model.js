import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";


const existencias = connection.define('existencia', {
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
    LOTE: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FECHA_REC: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    FECH_VENC: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    CANT_EXIST: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ESTADO_REGISTRO: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

export default existencias;