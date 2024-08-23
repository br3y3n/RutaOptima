import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Ruta = sequelize.define('ruta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    origen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ruta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName:'ruta',
    createdAt:true,
    updatedAt:true
  });
  
  export default Ruta;