import { Router } from "express";
import { createRuta, deleteRuta, getAllRuta, getRutaById, updateRuta } from "../controller/ruta.js";

const routerRuta = Router()


routerRuta.post('/', createRuta)
routerRuta.get('/', getAllRuta)
routerRuta.get('/:id', getRutaById)
routerRuta.put('/:id', updateRuta)
routerRuta.delete('/:id', deleteRuta)

export default routerRuta