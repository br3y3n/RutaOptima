export function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRad = (angle) => angle * (Math.PI / 180);

    const deltaLat = toRad(lat2 - lat1);
    const deltaLon = toRad(lon2 - lon1);

    const a = Math.sin(deltaLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(deltaLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

const ubicaciones =[
    {
    posicionXA: 2.4347474578930672, 
    posicionYA:-76.60637030431363,
    posicionXB:2.433335672810955,
    posicionYB: -76.61172892138391  
    },
    {
    posicionXA: 2.4390567323022196, 
    posicionYA:-76.60532406891588,
    posicionXB:2.434748046724863,
    posicionYB: -76.60637010032998
    },
    {
    posicionXA: 2.4408566830457517, 
    posicionYA:-76.61025162659932,
    posicionXB:2.439114877974376,
    posicionYB: -76.60533344380924
    },

]

const distance = ubicaciones.map((item)=>{
    
  return  calcularDistancia(item.posicionXA, item.posicionYA, item.posicionXB, item.posicionYB);
})  


const tarifaPorKm = 10000;

const price = distance.map(item=>{
    console.log(`Distancia: ${item.toFixed(2)} km`);
   return item* tarifaPorKm;
}) 

price.sort((a,b)=> a-b)

console.log(`Precio: ${price[0].toFixed(2)} cop`);
console.log(`Precio: ${price[1].toFixed(2)} cop`);
console.log(`Precio: ${price[2].toFixed(2)} cop`);
