import { Button } from "@mui/material";
import React from "react";

function AddPlaceMaps(props) {
    const mapRef = React.useRef(null);
    const [map, setMap] = React.useState();
    let marker = null;
    let circle = null;
    let markers = [];
    const defaultLatLng = props.latLng;
    let center = null;
    const onMarked = props.onMarked;

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

        if (map) {
            marker = new window.google.maps.Marker({
                position: map.center,
                map: map,
                draggable:true,
            })

            map.addListener("click", (e) => {
                placeMarkerAndPanTo(e.latLng, map);
            });
        }
    }, [mapRef, map]);

    return (<>
        <div ref={mapRef} style={mapStyle}>
        </div>
        <br />
    </>);
}

export default AddPlaceMaps;