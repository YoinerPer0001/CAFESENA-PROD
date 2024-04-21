  import { connection } from "../database/db.js";
  import { Sequelize, DataTypes } from "sequelize";
  
  
  const Localizacion = connection.define('Localizacion', {
     
    Id_Loc: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true,
  
      },
      Dir_Ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Id_User_FK: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      ESTADO_REGISTRO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
    });
  
    export default Localizacion;