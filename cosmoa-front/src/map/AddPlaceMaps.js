import { Button } from "@mui/material";
import React, { useEffect } from "react";

function AddPlaceMaps(props) {
    const mapRef = React.useRef(null);
    const [map, setMap] = React.useState();
    const defaultLatLng = props.latLng;
    let center = null;
    const rows = [...props.rows];
    const markers = props.markers;
    const setMarkers = props.setMarkers;

    const infowindow = new window.google.maps.InfoWindow();

    const gumi = new window.google.maps.LatLng(36.1461, 128.3936);
    if (defaultLatLng) {
        center = new window.google.maps.LatLng(defaultLatLng.lat, defaultLatLng.lng);
    } else {
        center = gumi;
    }

    const mapStyle = {
        width: "100%",
        height: "250px",
    };

    const mapOptions = {
        zoom: 11,
        center: center,
        mapTypeId: 'roadmap'
    };

    React.useEffect(() => {
        if (mapRef.current && !map) {
            setMap(new window.google.maps.Map(mapRef.current, mapOptions));
        }
    }, [mapRef, map]);

    useEffect(()=>{
        if (map) {
            console.log(markers.length)
            markers.forEach((marker, i)=>{
                marker.setMap(null);
                console.log(i);
            })
            let tmp = [];
            rows.forEach((row, i) => {
                const marker = new window.google.maps.Marker({
                    position: new window.google.maps.LatLng(row.lat, row.lng),
                    map: map,
                });
                console.log(marker);
                tmp.push(marker);
            })
            setMarkers(tmp);
        }
    },[rows])

    return (<>
        <div ref={mapRef} style={mapStyle}>
        </div>
        <br />
    </>);
}

export default AddPlaceMaps;