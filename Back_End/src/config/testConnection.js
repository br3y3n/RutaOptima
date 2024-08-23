import sequelize from "./db.js";

async function testConnection() {  
    try {  
        await sequelize.authenticate();  
        console.log('Conexión establecida correctamente.');  
    } catch (error) {  
        console.error('No se pudo conectar a la base de datos:', error);  
    }  
}  


export default testConnection
