import React, { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { Geocoder } from '@mapbox/search-js-react'
import { calcularDistancia } from '../utils/precioRuta'
import { Tabla } from './Tabla'
import { useRutaContext } from './ContexRuta'
import { MapaRutaOptima } from './MapaRutaOptima'

mapboxgl.accessToken ='pk.eyJ1IjoiYnJheWFuZGVsZ2FkbzIxIiwiYSI6ImNtMDFqcHYxZjFkdnIydG9xZ3JuczByOTEifQ.igO0RyxjJ9IQH7wI8D5Z7Q'

export const MapaUbicaciones = () => {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState([]); 
  const [route, setRoute] = useState(null);
  const [locations, setLocations] = useState([])
  const [id, setId] = useState(1)
  const {ruta} = useRutaContext()
  const locationsFilter =[]

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-76.6131, 2.4444], 
      zoom: 13,
    });
    setMap(newMap);

    newMap.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      if (location.length < 2) {
        const newLocation = { lat, lng };
        setLocation(prev => {
          const updatedLocations = [...prev, newLocation];
          if (updatedLocations.length === 2) {
            calculateRoute(updatedLocations);
          }
          return updatedLocations;
        });
        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(newMap);
      }
    });
  }, []);

  const calculateRoute = async (locations) => {
    const start = locations[0];
    const end = locations[1];
    const tarifaPorKm = 5000;
    const distancia = calcularDistancia(start.lat, start.lng,end.lat,end.lng)
    const precio = distancia* tarifaPorKm

    setId(prevId => {
      const newId = prevId + 1;
      console.log("New ID:", newId);
      return newId;
    });
    
    setLocations(prev => [
      ...prev,
      {
        posicionX: locations[0],
        posicionY: locations[1],
        nombre: `Ruta ${id}`,
        distancia: distancia,
        precio:precio
      }
    ]);
    
    console.log(id)
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    setRoute(data.routes[0].geometry.coordinates);
  };

  useEffect(() => {
    if (map && route) {
      if (map.getLayer('route')) {
        map.removeLayer('route');
        map.removeSource('route');
      }

      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route,
            },
          },
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#07bef3',
          'line-width': 6,
        },
      });

      setLocation([]);
      setRoute(null);
    }
  }, [map, route]);

  
    locations.forEach((element, indice) => {
        if( indice % 2 == 0){
           locationsFilter.push(element)
        }
    }); 
  return (
    <div>
      <section className='grid grid-cols-2'>
      <div>
      {locationsFilter && (
          <Tabla 
          locations={locationsFilter}
                />
      )}
      </div>
        <div>
        <Geocoder className='w-full' accessToken={mapboxgl.accessToken} />
        {ruta.length >0? 
        <MapaRutaOptima/>:
        <div id='map' className='w-full h-80' />    
        }
        </div>
      </section>
    
    </div>
  );
}
