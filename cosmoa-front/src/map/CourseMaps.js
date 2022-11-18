import React, { useEffect } from "react";

function CourseMaps(props) {
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
  };

  React.useEffect(() => {
    if (mapRef.current && !map) {
      setMap(new window.google.maps.Map(mapRef.current, mapOptions));
    }
  }, [mapRef, map]);

  useEffect(() => {
    if (map) {
      markers.forEach((marker, i) => {
        marker.setMap(null);
        // console.log(i);
      });
      let tmp = [];
      rows.forEach((row, i) => {
        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(row.lat, row.lng),
          map: map,
        });
        tmp.push(marker);
      });
      setMarkers(tmp);
    }
  }, [rows]);

  useEffect(() => {
    if (map) {
      const ll = new window.google.maps.LatLng(latlng.lat, latlng.lng);
      map.panTo(ll);
      map.setZoom(15);
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
