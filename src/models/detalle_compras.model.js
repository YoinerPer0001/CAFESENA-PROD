import { connection } from "../database/db.js";
import { DataTypes } from "sequelize";
import Producto from "./productos.models.js";


const detalle_compra = connection.define('detalle_compra', {
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
    Prov_Id_FK:{
        type:DataTypes.DATE,
        allowNull: false
    }
})

export default detalle_compra;

