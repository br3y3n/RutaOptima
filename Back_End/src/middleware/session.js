import { verificarToken } from "../utils/jwt.handle.js"


export const checkJwt =(req,res, next)=>{
    try {
        const jwtUsuario =req.headers.authorization
        const jwt = jwtUsuario.split(" ").pop()
        const jwtValidado= verificarToken(jwt)
        console.log(jwtUsuario)
        if(jwtValidado =='jwt expired'){

            return res.status(401).json({
                msg:"Token expirado"
            })
        }

        if(!jwtValidado){
            return res.status(401).send("No tienes un jwt valido")
        }

        req.user = jwtValidado

        return next()
    } catch (error) {
        res.status(400).json({msg:"Error al validar token"})
    }

}