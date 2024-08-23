import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Conexiones = sequelize.define('conexiones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    valor: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    distancia: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    ubicacionA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ubicacionB: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  }, {
    timestamps: true,
    createdAt:true,
    updatedAt:true
  });

  
  export default Conexiones;