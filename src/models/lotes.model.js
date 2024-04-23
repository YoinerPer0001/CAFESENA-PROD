import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";
import existencias from "./existencias.model.js";


const lotes = connection.define('lotes', {
    ID_LOTE:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true,
    },
    COD_LOTE:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    FEC_REC:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    FEC_VENC:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    ESTADO_REGISTRO:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
})

lotes.hasMany(existencias, { foreignKey: 'ID_LOTE_FK'})
existencias.belongsTo(lotes, { foreignKey: 'ID_LOTE_FK', targetKey: 'ID_LOTE' })

export default lotes;