import { SocialDistance } from "@mui/icons-material";
import React, { useEffect } from "react";
import icon1 from "../images/markers/1.png";
import icon2 from "../images/markers/2.png";
import icon3 from "../images/markers/3.png";
import icon4 from "../images/markers/4.png";
import icon5 from "../images/markers/5.png";
import icon6 from "../images/markers/6.png";
import icon7 from "../images/markers/7.png";
import icon8 from "../images/markers/8.png";
import icon9 from "../images/markers/9.png";

function CoursePreviewMaps(props) {
    const icons = [
        icon1,
        icon2,
        icon3,
        icon4,
        icon5,
        icon6,
        icon7,
        icon8,
        icon9,
    ];
    const mapRef = React.useRef(null);
    const [map, setMap] = React.useState();

    let center = new window.google.maps.LatLng(36.1461, 128.3936);
    const rows = [...props.rows];


    const defaultzoom = 0;
    const mapStyle = {
        width: "100%",
        height: "150px",
    };

    const mapOptions = {
        zoom: 11,
        center: center,
        mapTypeId: "roadmap",
        disableDefaultUI: true,
    };

    const symbol = {
        path: "M -1 -1 L -3 -1 L -2 -3 z",
        strokeOpacity: 1,
        scale: 2,
        strokeColor: "#53A5DB",
        fillColor: "#53A5DB",
        fillOpacity: 1,
    }

    const createIcon = (idx) => {
        let icon = {
            url: icons[idx], // url
            scaledSize: new window.google.maps.Size(23, 23), // scaled size
            //origin: new window.google.maps.Point(10, 10), // origin
            anchor: new window.google.maps.Point(10, 8), // anchor
        };

        return icon;
    }

    const calcDistance = (coordsA, coordsB) => {
        let latA = degreesToRadians(coordsA.lat);
        let lngA = degreesToRadians(coordsA.lng);
        let latB = degreesToRadians(coordsB.lat);
        let lngB = degreesToRadians(coordsB.lng);
        const RADIUS = 6371; // 지구의 반경 6371(km)
        const dist = Math.acos(Math.sin(latA) * Math.sin(latB) +
            Math.cos(latA) * Math.cos(latB) *
            Math.cos(lngA - lngB)) * RADIUS;

        return dist;
    }

    const degreesToRadians = (degrees) => {
        const radians = (degrees * Math.PI) / 180;
        return radians;
    }

    useEffect(() => {
        if (mapRef.current && !map) {
            setMap(new window.google.maps.Map(mapRef.current, mapOptions));
        }
    }, [mapRef, map]);

    useEffect(() => {
        if (map) {
            let path = [];
            let coordsA = {};
            let coordsB = {};
            let maxDist = 0;
            let centerLat = 0;

            rows.forEach((row, i) => {
                if (i === 0) {
                    coordsA = { lat: row.lat, lng: row.lng };
                    map.panTo(new window.google.maps.LatLng(row.lat, row.lng));
                    map.setZoom(15);
                } else {
                    var dist = calcDistance(coordsA, { lat: row.lat, lng: row.lng });
                    if (maxDist < dist) {
                        coordsB = { lat: row.lat, lng: row.lng };
                        maxDist = dist;
                        centerLat = (coordsA.lat + coordsB.lat);
                    }
                }
                const marker = new window.google.maps.Marker({
                    position: new window.google.maps.LatLng(row.lat, row.lng),
                    map: map,
                    icon: createIcon(i),
                });
                path.push({ lat: row.lat, lng: row.lng });
            });
            console.log("maxDist: " + maxDist);
            const zl = Math.log2(38000 * Math.cos(centerLat * Math.PI / 180) / maxDist) + defaultzoom;
            map.panTo(new window.google.maps.LatLng((coordsA.lat + coordsB.lat) / 2, (coordsA.lng + coordsB.lng) / 2));
            map.setZoom(zl);

            new window.google.maps.Polyline({
                path: path,
                strokeOpacity: 1,
                strokeColor: "#003399",
                strokeWeight: 5,
                // icons: [
                //     {
                //         icon: symbol,
                //         offset: "0",
                //         repeat: "10px",
                //     },
                // ],
                map: map,
            });
        }
    }, [rows]);

    return (
        <>
            <div ref={mapRef} style={mapStyle}></div>
            <br />
        </>
    );
}

export default CoursePreviewMaps;
