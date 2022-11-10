import { Wrapper } from "@googlemaps/react-wrapper";
import { GOOGLE_KEY } from "../service/app-config";
import GoogleMaps from "./GoogleMaps";

function MapWrapper(props) {
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
