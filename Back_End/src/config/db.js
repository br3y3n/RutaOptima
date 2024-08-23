import { Sequelize } from "sequelize";

const sequelize = new Sequelize('ruta_optima', 'root', '1234', {  
    host: 'localhost',  
    dialect: 'mysql',
});  

export default sequelize;



