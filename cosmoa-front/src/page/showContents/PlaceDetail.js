import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { call } from "../../service/ApiService";

function PlaceDetail() {
    const [place, setPlace] = useState({});
    const [comments, setComments] = useState([]);
    const params = useParams();
    const pid = params.id;

    useEffect(() => {
        call(`/place/detail/${pid}`, "GET", {}, null)
        .then((response) => {
            console.log(response);
            setPlace(response.data);
        });

        call(`/place-reply/${pid}`, "GET", {}, null)
        .then((response) => {
            console.log(response);
            setComments(response.data);
        });        
    }, []);

    

    return(<>
    </>)
}

export default PlaceDetail;