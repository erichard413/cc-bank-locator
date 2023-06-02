import React, { useEffect } from "react";
import '../styles/Map.css';

function Map({currBank}){
    let mapQuery = '';
    const initialCoords = {
      lat: '42.101391',
      long: '-72.590279'
    }
    if (currBank) {
      mapQuery = `${currBank.fullAddress}`;
    } else {
      mapQuery = initialCoords.lat + ',' + initialCoords.long
    }

    useEffect(()=>{
        const iframeData=document.getElementById("map")  
          iframeData.src=`https://maps.google.com/maps?q=${mapQuery}&hl=es;"&output=embed`
    })
    return(
        <div>
          <iframe id="map"></iframe>
        </div>
    );
}
export default Map;