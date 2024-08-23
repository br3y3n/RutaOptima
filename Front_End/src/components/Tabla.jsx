import React from 'react'
import mapboxgl from 'mapbox-gl'
import { useRutaContext } from './ContexRuta'
import axios from 'axios'
mapboxgl.accessToken ='pk.eyJ1IjoiYnJheWFuZGVsZ2FkbzIxIiwiYSI6ImNtMDFqcHYxZjFkdnIydG9xZ3JuczByOTEifQ.igO0RyxjJ9IQH7wI8D5Z7Q'
export const Tabla = ({locations}) => {
  const {updateRuta, updateIdRuta, idRutas, origen, destino}= useRutaContext()
  const locationOrder =  locations.sort((a,b)=>a.precio-b.precio)

  const optenerRutaOptima =async ()=>{
    const waypoints = locationOrder.map(ruta => `${ruta.posicionX.lng},${ruta.posicionX.lat}`);
  const waypointsString = waypoints.join(';');
  console.log(waypointsString)
  fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${waypointsString}?geometries=geojson&access_token=${mapboxgl.accessToken}`)
    .then(response => response.json())
    .then(data => {
      console.log('Ruta optimizada:', data.routes[0].geometry.coordinates);
      updateRuta(data.routes[0].geometry.coordinates)
    });

    
   try {
 
     const response = await Promise.all(
       locationOrder.map(async (item) => {
         return await axios.post('http://localhost:7777/conexion', {
           valor: item.precio.toFixed(2),
           distancia: item.distancia.toFixed(2),
           ubicacionA: `lat: ${item.posicionX.lat} lng: ${item.posicionX.lng}`,
           ubicacionB: `lat: ${item.posicionY.lat} lng:${item.posicionY.lng}`,
         });
       })
     );
   
     const resId = response.map((item)=> item.data.resId)
    
     updateIdRuta(resId)
     
   } catch (error) {
    console.log(error)
   }
  }

  const postRuta = async()=>{
    
        const rutaOptima = await axios.post('http://localhost:7777/ruta',
        {
          origen:origen.join(', '),
          destino:destino. join(', '),
          ruta: idRutas.join(', ')
        })
        alert(rutaOptima.data.msg)
}


  return (
    <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">Nombre</th>
                <th scope="col" className="px-6 py-4">Precio</th>
                <th scope="col" className="px-6 py-4">Distancia</th>
                <th scope="col" className="px-6 py-4">PosicionX </th>
                <th scope="col" className="px-6 py-4">PosicionY </th>
              </tr>
            </thead>
            <tbody>
                {locationOrder && locationOrder.map((location, index)=>(
              <tr key={index}
                className="border-b transition duration-300 ease-linear hover:z-10 hover:bg-neutral-200 dark:border-neutral-50">
                <td className="whitespace-nowrap px-6 py-4 font-medium">{location.nombre}</td>
                <td className="whitespace-nowrap px-6 py-4">{location.precio.toFixed(2)} COP</td>
                <td className="whitespace-nowrap px-6 py-4">{location.distancia.toFixed(2)} KM</td>
                <td className="whitespace-nowrap px-6 py-4">Lat{location.posicionX.lat.toFixed(4)} Lng {location.posicionX.lng.toFixed(4)} </td>
                <td className="whitespace-nowrap px-6 py-4">Lat {location.posicionY.lat.toFixed(4)} Lng {location.posicionY.lng.toFixed(4)}</td>
              </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className='flex gap-5 justify-around '>
    {locationOrder.length >1 && (
        <button onClick={()=>optenerRutaOptima()} className='w-56 bg-black text-white p-3 rounded-lg shadow-gray-300 mt-5 font-medium text-xl'>Crear Ruta Optima</button>
    )}
    {idRutas.length >0 && (
      <button onClick={()=>postRuta()} className='w-56 bg-black text-white p-3 rounded-lg shadow-gray-300 mt-5 ml-5 font-medium text-xl'>Gurdar Ruta Optima</button>
    )}
    </div>
  </div>
  )
}
