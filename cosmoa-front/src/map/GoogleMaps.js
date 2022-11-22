import { Button } from "@mui/material";
import React from "react";

const M = window.M;

function GoogleMaps(props) {
    const mapRef = React.useRef(null);
    const [map, setMap] = React.useState();
    let marker = null;
    let circle = null;
    let markers = [];
    const defaultLatLng = props.latLng;
    let center = null;
    
    const gumi = new window.google.maps.LatLng(36.1461, 128.3936);
    if (defaultLatLng) {
        center = new window.google.maps.LatLng(defaultLatLng.lat, defaultLatLng.lng);
    } else {
        center = gumi;
    }
    const geocoder = new window.google.maps.Geocoder();
    const infowindow = new window.google.maps.InfoWindow();
    
    const mapStyle = {
        width: "100%",
        height: "250px",
    };

    const mapOptions = {
        zoom: 11,
        center: center,
        mapTypeId: 'roadmap'
    };

    const onMarked = props.onMarked;
    
    const buttonRef = React.useRef(null);

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

    function geocodeLatLng(latLng, geocoder, map, marker, infowindow)  {
        geocoder.geocode({location: latLng})
        .then((response) => {
            if (response.results[0]) {
                infowindow.setContent(response.results[0].formatted_address);
                infowindow.open(map, marker);
                onMarked(latLng.lat(), latLng.lng(), response.results[0].formatted_address);
            } else {
                window.alert("No results found");
                onMarked(latLng.lat(), latLng.lng(), "알 수 없는 주소");
            }
        })
        .catch((e) => {
            console.log("Geocoder failed : " + e);
        });
    }

    function geocodeAddr(address, geocoder)  {
        geocoder.geocode({address: address})
        .then((response) => {
                console.log(response);
                
        })
        .catch((e) => {
            console.log("Geocoder failed : " + e);
        });
    }

    function placeMarkerAndPanTo(latLng, map) {   
        marker.setPosition(latLng);
        map.panTo(latLng);
        if (onMarked) {
            geocodeLatLng(latLng, geocoder, map, marker, infowindow);
        }
    }

    return (<>
        <div ref={mapRef} style={mapStyle}>
        </div>
        <br />
    </>);
}

export default GoogleMaps;