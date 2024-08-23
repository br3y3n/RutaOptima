import { Router } from "express";
import { createUsuario, deleteUsuario, getAllUsuarios, getUsuarioById, updateUsuario } from "../controller/usuario.js";
import { loginUsuario } from "../controller/inicioSession.js";
import { checkJwt } from "../middleware/session.js";

const router = Router()


router.post('/', createUsuario)
router.post('/login', loginUsuario)
router.post('/validacion', getAllUsuarios)
router.get('/session', checkJwt,getUsuarioById)
router.put('/:id', updateUsuario)
router.delete('/:id', deleteUsuario)

export default router