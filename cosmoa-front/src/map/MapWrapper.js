import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect } from "react";
import { GOOGLE_KEY } from "../service/app-config";
import AddPlaceMaps from "./AddPlaceMaps";
import CourseDetialMaps from "./CourseDetailMaps";
import CourseMaps from "./CourseMaps";
import CoursePreviewMaps from "./CoursePreviewMaps";
import GoogleMaps from "./GoogleMaps";

export function MapWrapper(props) {
  const render = (status) => {
    return <h1>{status}</h1>;
  };

  return (
    <Wrapper apiKey={GOOGLE_KEY} render={render}>
      <GoogleMaps onMarked={props.onMarked} latLng={props.latLng} />
    </Wrapper>
  );
}

export default MapWrapper;

export function AddPlaceMapWrapper(props) {
  const latlng = props.latlng;
  const render = (status) => {
    return <h1>{status}</h1>;
  };

  useEffect(() => {
    // console.log(props.latlng, latlng);
  }, [latlng]);

  return (
    <Wrapper apiKey={GOOGLE_KEY} render={render}>
      <AddPlaceMaps
        rows={props.rows}
        markers={props.markers}
        setMarkers={props.setMarkers}
        latlng={props.latlng}
      />
    </Wrapper>
  );
}

export function CourseMapWrapper(props) {
  const render = (status) => {
    return <h1>{status}</h1>;
  };

  return (
    <Wrapper apiKey={GOOGLE_KEY} render={render}>
      <CourseMaps
        rows={props.rows}
        markers={props.markers}
        setMarkers={props.setMarkers}
        latlng={props.latlng}
      />
    </Wrapper>
  );
}

export function CourseDetailMapWrapper(props) {
  const render = (status) => {
    return <h1>{status}</h1>;
  };

  return (
    <Wrapper apiKey={GOOGLE_KEY} render={render}>
      <CourseDetialMaps
        rows={props.rows}
        markers={props.markers}
        setMarkers={props.setMarkers}
        latlng={props.latlng}
      />
    </Wrapper>
  );
}

export function CoursePreviewMapWrapper(props) {
  const render = (status) => {
    return <h1>{status}</h1>;
  };

  return (
    <Wrapper apiKey={GOOGLE_KEY} render={render}>
      <CoursePreviewMaps
        rows={props.rows}
        // markers={props.markers}
        // setMarkers={props.setMarkers}
        // latlng={props.latlng}
      />
    </Wrapper>
  );
}