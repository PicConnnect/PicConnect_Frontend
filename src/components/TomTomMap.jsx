import React, {useRef, useEffect, useMemo} from "react";
import tt from "@tomtom-international/web-sdk-maps";
import '@tomtom-international/web-sdk-maps/dist/maps.css'

const TomTomMap = ({lat,lng}) => {
    console.log("lat ", lat , "lng", lng);
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        const map = tt.map({
            key: "tvvS8ShGh7izeHqPcrjDnEpWxo0Y5P9P",
            container: mapContainerRef.current,
            center: [lng, lat],
            zoom: 15,
        });
        mapInstanceRef.current = map;
        const marker = new tt.Marker({draggable: false}).setLngLat([lng, lat]);
        marker.addTo(map)

        return() => {
            map.remove();
            
        };
    }, [lat,lng]);

    return <div ref = {mapContainerRef} style={{ width: '100%', height: '500px' }}/>
};
export default TomTomMap