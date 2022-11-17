import React from "react";

function CourseMaps(props) {
    const mapRef = React.useRef(null);
    const [map, setMap] = React.useState();
    let marker = null;
    let circle = null;
    let markers = [];
    const defaultLatLng = props.latLng;
    let center = null;

    return (<>
        <div ref={mapRef} style={mapStyle}>
        </div>
        <br />
    </>);
}

export default CourseMaps;