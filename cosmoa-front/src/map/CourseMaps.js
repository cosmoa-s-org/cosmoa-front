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

function CourseMaps(props) {
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
  const latlng = props.latlng;

  let center = new window.google.maps.LatLng(36.1461, 128.3936);
  const rows = [...props.rows];
  const markers = props.markers;
  const setMarkers = props.setMarkers;

  const mapStyle = {
    width: "100%",
    height: "250px",
  };

  const mapOptions = {
    zoom: 11,
    center: center,
    mapTypeId: "roadmap",
    //disableDefaultUI: true,
    controlSize: 25,
    zoomControl: false,
    panControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    scaleControl: false,
  };

  const contentString = '<h3>'+ latlng.pName +'</h3>' + latlng.pDesc;

  const infowindow = new window.google.maps.InfoWindow({
    content: contentString,
  });

  const createIcon = (idx) => {
    let icon = {
      url: icons[idx], // url
      scaledSize: new window.google.maps.Size(30, 30), // scaled size
      //origin: new window.google.maps.Point(10, 10), // origin
      anchor: new window.google.maps.Point(11, 8), // anchor
    };

    return icon;
  }

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(new window.google.maps.Map(mapRef.current, mapOptions));
    }
  }, [mapRef, map]);

  useEffect(() => {
    if (map) {
      markers.forEach((marker, i) => {
        marker.setMap(null);
      });
      let tmp = [];
      let path = [];
      rows.forEach((row, i) => {
        if (i === 0) {
          map.panTo(new window.google.maps.LatLng(row.lat, row.lng));
          map.setZoom(15);
        }

        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(row.lat, row.lng),
          map: map,
          icon: createIcon(i),
        });
        path.push({lat: row.lat, lng: row.lng});
        tmp.push(marker);
      });

      setMarkers(tmp);

      const lineSymbol = {
        path: "M 0,-1 0,1",
        strokeOpacity: 1,
        scale: 3,
      };

      const symbol = {
        path: "M -1 -1 L -3 -1 L -2 -3 z",
        strokeOpacity: 1,
        scale: 2,
        strokeColor: "#F00",
        fillColor: "#F00",
        fillOpacity: 1,
      }

      const line = new window.google.maps.Polyline({
        path: path,
        strokeOpacity: 0,
        icons: [
          {
            icon: symbol,
            offset: "0",
            repeat: "12px",
          },
        ],
        map: map,
      });
    }
  }, [rows]);

  useEffect(() => {
    if (map) {
      const ll = new window.google.maps.LatLng(latlng.lat, latlng.lng);
      const marker = new window.google.maps.Marker({position: ll, map: map, visible: false,});
      map.panTo(ll);
      map.setZoom(15);
      infowindow.open({
        anchor: marker,
        map,
      })
    }
  }, [latlng]);

  return (
    <>
      <div ref={mapRef} style={mapStyle}></div>
      <br />
    </>
  );
}

export default CourseMaps;
