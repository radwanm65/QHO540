import { useRef, useState, useEffect } from 'react';
import 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap() {
    const map = useRef(null);
    const [lat, setLat] = useState(51.05);
    const [lon, setLon] = useState(-0.72);

    useEffect( ()=> {
        loadMap();
    });



    return(
        <div>
        Lat: <input id='lat' />
        Lon: <input id='lon' />
        <input type='button' value='go' onClick={setPos} />
        <p>Map centred at: {lat} {lon}</p>
        <div id="map1" style={{width:"800px", height:"600px"}}></div>
        </div>
    );
    
    function setPos() {
        const lt = document.getElementById('lat').value;
        const lng = document.getElementById('lon').value;
        setLat(lt);
        setLon(lng);
        map.current.setView([lt, lng], 14);
    }

    function loadMap() {
        // Initialise the map ref if it hasn't been initialised already
        if(map.current === null) { 
            map.current = L.map("map1");
            // Set the map up in the normal way
            L.tileLayer ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                { attribution: "Copyright OSM contributors, ODBL" } )
                .addTo(map.current);
            const pos = [lat, lon];    
            map.current.setView(pos, 14);

            // Handle the map moveend event by updating the state appropriately
            map.current.on("moveend", e=> {
                const centre = map.current.getCenter();
                setLat(centre.lat);
                setLon(centre.lng);
            });
        }
    }
}