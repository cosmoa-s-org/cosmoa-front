import React, { useEffect } from "react";

function CourseDetialMaps(props) {
  const mapRef = React.useRef(null);
  const [map, setMap] = React.useState();
  const latlng = props.latlng;

  // 금오공대 좌표
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

  const contentString = '<h3>'+ latlng.pName +'</h3>' + latlng.pDesc;

  const infowindow = new window.google.maps.InfoWindow({
    content: contentString,
  });

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
        console.log(row)
        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(row.lat, row.lng),
          map: map,
        });
        tmp.push(marker);
        const contentAll = '<h3>'+ row.pName +'</h3>' + row.pDesc;
        const showAllInfo = new window.google.maps.InfoWindow({
          content: contentAll,
        })
        showAllInfo.open({
          anchor: marker,
          map,
        })
      });
      setMarkers(tmp);
    }
  }, [rows]);

  useEffect(() => {
    if (map) {
      const ll = new window.google.maps.LatLng(latlng.lat, latlng.lng);
      const marker = new window.google.maps.Marker({position: ll, map: map});
      map.panTo(ll);
      map.setZoom(15);
      infowindow.open({
        anchor: marker,
        map,
      })
    }
    console.log(rows);
  }, [latlng]);

  return (
    <>
      <div ref={mapRef} style={mapStyle}></div>
      <br />
    </>
  );
}

export default CourseDetialMaps;
