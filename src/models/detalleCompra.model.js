import { connection } from "../database/db";
import { DataTypes } from "sequelize";

const detalleCompra = connection.define( 'detalleCompra',{
    Id_Detalle:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
    },
    Id_Enc_FK:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Id_Prod_FK:{
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
    }
})