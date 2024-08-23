import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Register = () => {

    const [correo, setCorreo] = useState()
    const [contraseña, setContraseña] = useState()
    const [nombre, setNombre] = useState()
    const [registroUser, setRegistroUser] = useState()
    const navigate = useNavigate()

    const submit =async(e)=>{
        e.preventDefault()
        const response = await axios.post('http://localhost:7777/usuario/',{correo,contraseña,nombre})
        console.log(response.data)
        setRegistroUser(response.data.msg)
        alert(response.data.msg)
        setTimeout(()=>{
            navigate('/')
        },1000)
    }

  return (
    <section className="bg-gray-50">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
        <div className="w-full bg-white rounded-lg shadow sm:max-w-md ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Crea una cuenta en Ruta Optima
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={submit} action="#">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                        <input 
                        onChange={(e)=> setCorreo(e.target.value)}
                        type="email" 
                        name="email" 
                        id="email" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
                        placeholder="name@company.com" 
                        required=""/>
                    </div>
                    <div>
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 ">Your name</label>
                        <input 
                        onChange={(e)=>setNombre(e.target.value)}
                        type="text" 
                        name="text" 
                        id="text" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
                        placeholder="example " 
                        required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input
                        onChange={(e)=>setContraseña(e.target.value)} 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="••••••••" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
                        required="" />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                        <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                    </div>
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required="" />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                    <p className="text-sm font-light text-gray-500 ">
                        Already have an account?  
                        <Link to={'/'} className='font-medium text-primary-600 hover:underline'>
                        Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}
