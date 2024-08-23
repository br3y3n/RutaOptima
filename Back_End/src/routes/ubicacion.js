import { Router } from "express";
import { createUbicacion, deleteUbicacion, getAllUbicacion, getUbicacionById, updateUbicacion } from "../controller/ubicacion.js";


const routerUbicacion = Router()


routerUbicacion.post('/', createUbicacion)
routerUbicacion.get('/', getAllUbicacion)
routerUbicacion.get('/:id', getUbicacionById)
routerUbicacion.put('/:id', updateUbicacion)
routerUbicacion.delete('/:id', deleteUbicacion)

export default routerUbicacion