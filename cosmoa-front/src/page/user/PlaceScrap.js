import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { call } from "../../service/ApiService";
import PlaceGrid from "../../components/Grid/PlaceGrid";

function PlaceScrap() {

    let userId = JSON.parse(localStorage.getItem("USER")).id
    const header = { "Content-Type": "application/json" };
    const [listGrid, setListGrid] = useState(<></>);




    useEffect( () => {
        call(`/place/scraped-place?userId=${userId}`, "GET", header, null)
        .then((response) => {
            console.log(response);
            setListGrid(<PlaceGrid list={response.data} />);
        })
    }, [])



    return (<>
    <Container style={{marginTop:"10%"}}>
        {listGrid}
    </Container>
    </>)
}

export default PlaceScrap;