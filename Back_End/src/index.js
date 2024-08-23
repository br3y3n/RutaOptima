import { config } from "dotenv";
import testConnection from "./config/testConnection.js";
import express from "express";
import router from "./routes/usuario.js";
import routerRuta from "./routes/ruta.js";
import routerUbicacion from "./routes/ubicacion.js";
import routerConexion from "./routes/conexiones.js";
import cors from 'cors'

config({ path: '.env' });

const app = express();
app.use(express.json())
testConnection()
app.use(cors())
app.use('/usuario', router)
app.use('/ruta', routerRuta)
app.use('/ubiacion', routerUbicacion)
app.use('/conexion', routerConexion)
const PORT = 7777;
app.listen(PORT, () => {
    console.log(`server working properly ${PORT}`)
});

