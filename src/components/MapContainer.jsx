import React from 'react';
import '../styles/MapContainer.css';
import Map from './Map';

function MapContainer ({ currBank}) {
    return (
        <div className="MapContainer">
            <Map currBank={currBank} />  
        </div>
    )
}

export default MapContainer
