import React, {useRef, useEffect, useMemo} from "react";
import tt from "@tomtom-international/web-sdk-maps";
import '@tomtom-international/web-sdk-maps/dist/maps.css'

const TomTomMap = ({lat,lng}) => {
    console.log("lat ", lat , "lng", lng);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        //init map with api key
        const map = tt.map({
            key: "tvvS8ShGh7izeHqPcrjDnEpWxo0Y5P9P",
            container: mapContainerRef.current,
            center: [lng, lat],
            zoom: 15,
        });

        //create a new marker with the specified coordinates and set/add it in map
        const marker = new tt.Marker({draggable: false}).setLngLat([lng, lat]);
        marker.addTo(map)

        //clean up the map when unmount
        return() => {
            map.remove();
        };
    }, [lat,lng]);

    //render use ref to avoid unnecessary rerender
    return <div ref = {mapContainerRef} style={{ width: '90%', height: '200px' }}/>
};
export default TomTomMap