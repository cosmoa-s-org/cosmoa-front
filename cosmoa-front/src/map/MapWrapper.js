import { Wrapper } from "@googlemaps/react-wrapper";
import { GOOGLE_KEY } from "../service/app-config";
import AddPlaceMaps from "./AddPlaceMaps";
import GoogleMaps from "./GoogleMaps";

export function MapWrapper(props) {
    const render = (status) => {
        return <h1>{status}</h1>;
    };

    return (
        <Wrapper apiKey={GOOGLE_KEY} render={render}>
            <GoogleMaps onMarked={props.onMarked} latLng={props.latLng}/>
        </Wrapper>
    );
}

export default MapWrapper;

export function AddPlaceMapWrapper(props) {

    const render = (status) => {
        return <h1>{status}</h1>;
    }

    return (
        <Wrapper apiKey={GOOGLE_KEY} render={render}>
            <AddPlaceMaps rows={props.rows} markers={props.markers} setMarkers={props.setMarkers}/>
        </Wrapper>
    )
}

export function CourseMapWrapper(props) {

    const render = (status) => {
        return <h1>{status}</h1>;
    }

    return (
        <Wrapper apiKey={GOOGLE_KEY} render={render}>
            <AddPlaceMaps rows={props.rows} markers={props.markers} setMarkers={props.setMarkers}/>
        </Wrapper>
    )
}
