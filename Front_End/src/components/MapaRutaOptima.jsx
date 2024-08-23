import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useRutaContext } from './ContexRuta';


mapboxgl.accessToken = 'pk.eyJ1IjoiYnJheWFuZGVsZ2FkbzIxIiwiYSI6ImNtMDFqcHYxZjFkdnIydG9xZ3JuczByOTEifQ.igO0RyxjJ9IQH7wI8D5Z7Q';

export const MapaRutaOptima = () => {
    const [map, setMap] = useState(null);
    const { ruta,updateOrigen, updateDestino } = useRutaContext();
    const route = ruta[0]
    useEffect(() => {
        const newMap = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-76.6131, 2.4444],
            zoom: 13,
        });

        newMap.on('load', () => {
            setMap(newMap);
        });
    }, []);

    useEffect(() => {
        if (map && route.length > 0) {
            // Verifica que todas las coordenadas estén en el formato correcto
            const validCoordinates = route.every(coord => Array.isArray(coord) && coord.length === 2);
            if (!validCoordinates) {
                console.error('Formato de coordenadas incorrecto en ruta:', route);
                return;
            }

            // Elimina cualquier capa de ruta anterior si existe
            if (map.getLayer('route')) {
                map.removeLayer('route');
                map.removeSource('route');
            }

            // Agrega la nueva capa de ruta al mapa
            map.addSource('route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: route,
                    },
                },
            });

            map.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#0071e3', // Color de la línea
                    'line-width': 6, // Grosor de la línea
                },
            });

            // Añadir marcadores en el origen y destino
            const origen = route[0];
            const destino = route[route.length - 1];
            updateOrigen(origen)
            updateDestino(destino)
            new mapboxgl.Marker({ color: 'green' })
                .setLngLat(origen)
                .setPopup(new mapboxgl.Popup().setHTML('<h3>Inicio</h3>')) // Popup opcional
                .addTo(map);

            new mapboxgl.Marker({ color: 'red' })
                .setLngLat(destino)
                .setPopup(new mapboxgl.Popup().setHTML('<h3>Destino</h3>')) // Popup opcional
                .addTo(map);

            // Ajusta el mapa para mostrar toda la ruta
            const bounds = new mapboxgl.LngLatBounds();
            route.forEach(coord => bounds.extend(coord));
            map.fitBounds(bounds, { padding: 20 });
        }
    }, [map, route]);

    return <div id='map' className='w-full h-80' />;
};
