import { connection } from "../database/db.js";
import { DataTypes } from "sequelize";
import Producto from "./productos.models.js";
import {Encabezados} from "./encabezado.model.js";


const detalle = connection.define('detalle', {
    Id_Detalle: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    Id_Enc_FK:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Id_Prod_Fk:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Precio_U:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    ESTADO_REGISTRO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
})


Producto.hasMany(detalle, {foreignKey: 'Id_Prod_Fk',})
detalle.belongsTo(Producto, {foreignKey: 'Id_Prod_Fk', targetKey:'PROD_ID'})

Encabezados.hasMany(detalle,  {foreignKey: 'Id_Enc_FK'})
detalle.belongsTo(Encabezados, {foreignKey: 'Id_Enc_FK',  targetKey: 'ENC_ID'})

export default detalle;

