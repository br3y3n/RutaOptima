import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { MapaUbicaciones } from '../components/MapaUbicaciones'
export const Home = () => {

    const token = Cookies.get('token')
    const [jwtExpirado, setJwtExpirado]=useState()
    const [user, setUser] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
        const getUsuer =async()=>{
            try {
                const response = await axios.get('http://localhost:7777/usuario/session',{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(response.data.usuario)
                Cookies.set('idUser', response.data.usuario.id)
            } catch (error) {
                
               setJwtExpirado(error.response.data.msg)
               const id= Cookies.get('idUser')
               const updateUsuario = await axios.put(`http://localhost:7777/usuario/${id}`,{
                token:null
            })

            console.log(updateUsuario.data)

            Cookies.remove('idUser')
            setTimeout(()=>{
                navigate('/')
            },1000)
            }
        }
        getUsuer()
    },[])
    useEffect(()=>{
        if(jwtExpirado){
            alert('tu tiempo de sesion ha terminado, por favor inicia sesion nuevamente')


        }
    },[jwtExpirado])
  return (
    <div>
        {jwtExpirado && (
            <h1>{jwtExpirado}</h1>
        )}

    <div className='flex justify-between items-center'>
    <img src="\public\img\logoRutaOptima.png" alt="logo" className='w-40' />
        {
            user && (
                <div className='mr-10 flex gap-6'>
                    <Link className='font-medium cursor-pointer text-2xl' to={'/rutadefecto'}> Ruta por defecto</Link>
                    <h1 className='text-2xl font-medium  '>{user.nombre}</h1>
                </div>
            )
        }
    </div>


        <MapaUbicaciones/>
        
        </div>
  )
}
