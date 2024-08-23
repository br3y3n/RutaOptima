import { BrowserRouter, Router, useRoutes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { Register } from "./pages/Register"
import { ContexRuta } from "./components/ContexRuta"
import { MapaRutaDefecto } from "./components/MapaRutaDefecto"


function App() {
  
  const AppRoutes =()=>{
    const routes = useRoutes([
      {path:'/', element:<Login/>},
      {path:'/home', element:<Home/>},
      {path:'/registro', element:<Register/>},
      {path:'/rutadefecto', element:<MapaRutaDefecto/>}
    ])

    return routes
  }
  return (
    <BrowserRouter>
    <ContexRuta>
    <AppRoutes/>
    </ContexRuta>
    </BrowserRouter>
  )
}

export default App
