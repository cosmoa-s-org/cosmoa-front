import React, { useEffect, useState } from "react";

function AddPlaceMaps(props) {
  const mapRef = React.useRef(null);
  const [map, setMap] = React.useState();
  const latlng = props.latlng;
  let center = new window.google.maps.LatLng(36.1461, 128.3936);
  const rows = [...props.rows];
  const markers = props.markers;
  const setMarkers = props.setMarkers;
  const [InfoMarker, setInfoMarker] = useState([]);

  const contentString = '<h3>'+ latlng.pName +'</h3>' + latlng.pDesc;

  const infowindow = new window.google.maps.InfoWindow({
    content: contentString,
  });

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
      // console.log(markers.length)
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
        // console.log(marker);
        tmp.push(marker);
      });
      setMarkers(tmp);
    }
  }, [rows]);

  useEffect(() => {
    if (map) {
      infowindow.close(InfoMarker);
      const ll = new window.google.maps.LatLng(latlng.lat, latlng.lng);
      const marker = new window.google.maps.Marker({position: ll, map: map});
      setInfoMarker(marker);
      map.panTo(ll);
      map.setZoom(15);
      
      infowindow.open({
        anchor: marker,
        map,
      })
    }
    console.log(latlng)
  }, [latlng]);

  // useEffect(()=>{
  //     console.log(LatLng);

  //     if(map && LatLng){
  //         let ll = new window.google.maps.LatLng(LatLng.lat, LatLng.lng);
  //         map.panTo(ll);
  //     }
  // },[LatLng])

  return (
    <>
      <div ref={mapRef} style={mapStyle}></div>
      <br />
    </>
  );
}

export default AddPlaceMaps;
