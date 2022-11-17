import React, { useEffect, useState } from "react";

function AddPlaceMaps(props) {
    const mapRef = React.useRef(null);
    const [map, setMap] = React.useState();
    const latlng = props.latlng;
    let center = new window.google.maps.LatLng(36.1461, 128.3936);
    const rows = [...props.rows];
    const markers = props.markers;
    const setMarkers = props.setMarkers;

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

    

    React.useEffect(() => {
        if (mapRef.current && !map) {
            setMap(new window.google.maps.Map(mapRef.current, mapOptions));
        }
    }, [mapRef, map]);

    useEffect(()=>{
        if (map) {
            // console.log(markers.length)
            markers.forEach((marker, i)=>{
                marker.setMap(null);
                // console.log(i);
            })
            let tmp = [];
            rows.forEach((row, i) => {
                const marker = new window.google.maps.Marker({
                    position: new window.google.maps.LatLng(row.lat, row.lng),
                    map: map,
                });
                // console.log(marker);
                tmp.push(marker);
            })
            setMarkers(tmp);
        }
    },[rows])

    useEffect(() => {
        if (map) {
            console.log(props.latlng);
            console.log(latlng)
            const ll = new window.google.maps.LatLng(latlng.lat, latlng.lng);
            map.panTo(ll);
        }
    }, [latlng])

    // useEffect(()=>{
    //     console.log(LatLng);

    //     if(map && LatLng){
    //         let ll = new window.google.maps.LatLng(LatLng.lat, LatLng.lng);
    //         map.panTo(ll);
    //     }
    // },[LatLng])

    return (<>
        <div ref={mapRef} style={mapStyle}>
        </div>
        <br />
    </>);
}

export default AddPlaceMaps;