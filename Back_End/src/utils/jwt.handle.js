import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
const { sign , verify} = jwt;
config({ path: '.env' });


const JWT_SECRET = process.env.JWT_SECRET

console.log("JWT"+JWT_SECRET)
export const generarToken =(id)=>{
  
   const jwt = sign({id}, JWT_SECRET,{
    expiresIn: 1200
   } ) 

   return jwt
}


export const verificarToken=(jwt)=>{
    try {
        const jwtValidado = verify(jwt, JWT_SECRET)

        return jwtValidado
    } catch (error) {
          return error.message;
    }
}
