import { Router } from "express";
import { createConexion, deleteConexion, getAllConexion, getConexionById, updateConexion } from "../controller/conexiones.js";


const routerConexion = Router()


routerConexion.post('/', createConexion)
routerConexion.get('/', getAllConexion)
routerConexion.get('/:id', getConexionById)
routerConexion.put('/:id', updateConexion)
routerConexion.delete('/:id', deleteConexion)

export default routerConexion