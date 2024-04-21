import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";


export const Encabezados = connection.define('encabezados', {
    ENC_ID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    FECH_ENC: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    MET_PAGO: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    TOTAL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ID_USER_FK: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    TIPO_ENCABE: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    ESTADO_REGISTRO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});



