import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Ubicacion = sequelize.define('ubicacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    posicionX: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posicionY: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'ubicacion',
  });
  
  export default Ubicacion;