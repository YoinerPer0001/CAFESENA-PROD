import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";
import Usuario from "./users.model.js";
import { Encabezados } from "./encabezado.model.js";

const factura = connection.define('factura',{
    FACT_ID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    FACT_FECH:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    ID_EMPLEADO:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    ESTADO_REGISTRO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
})

Usuario.hasMany(factura,{foreignKey: 'ID_EMPLEADO'})
factura.belongsTo(Usuario,{as: 'Empleado', foreignKey: 'ID_EMPLEADO', targetKey: 'Id_User'})

Encabezados.hasOne(factura, {foreignKey: 'FACT_ID'})
factura.belongsTo(Encabezados, {foreignKey: 'FACT_ID'});

export default factura;