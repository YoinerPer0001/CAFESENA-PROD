import { connection } from "../database/db.js";
import  DataTypes  from 'sequelize';
import Producto from "./productos.models.js";
import { Encabezados } from "./encabezado.model.js";
const detalleVentas = connection.define('Ventas', {
    Id_Det_Vent: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
    total:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
})

detalleVentas.hasMany(Producto,{foreignKey:'Id_Prod_Fk'})
Producto.belongsTo(detalleVentas,{foreignKey :'Id_Prod_Fk', targetKey: 'PROD_ID'});

detalleVentas.hasMany(Encabezados,{foreignKey:'Id_Enc_FK'})
Encabezados.belongsTo(detalleVentas,{foreignKey :'Id_Enc_FK', targetKey: 'PROD_ID'});

export default detalleVentas;