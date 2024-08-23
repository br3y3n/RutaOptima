import React, { createContext, useContext, useState } from 'react'

const RutaContext = createContext()

export function useRutaContext (){
    return useContext(RutaContext)
}
export const ContexRuta = ({children}) => {
    const [ruta, setRuta]= useState([])
    const [idRutas, setidRutas] = useState([])
    const [origen, setOrigen] = useState([])
    const [destino, setDestino] = useState([])
    const updateRuta = (ruta)=>{
        setRuta(prev => [...prev, ruta])
    }

    const updateIdRuta = (ids)=>{
      setidRutas(prev => [...prev, ids])
  }

  const updateOrigen = (ids)=>{
    setOrigen(prev => [...prev, ids])
}

const updateDestino = (ids)=>{
  setDestino(prev => [...prev, ids])
}



    

  return (
    <RutaContext.Provider  value={{ruta,updateRuta, idRutas, updateIdRuta, origen, updateOrigen, destino, updateDestino}}>
        {children}
    </RutaContext.Provider>
  )
}
