import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { call } from "../../service/ApiService";
import CourseGrid from "../../components/Grid/CourseGrid";

function CourseScrap() {
    let userId = JSON.parse(localStorage.getItem("USER")).id
    const header = { "Content-Type": "application/json" }
    const [listGrid, setListGrid] = useState(<></>);

    useEffect(() => {
        call(`/course/scraped-course?userId=${userId}`, "GET", header, null)
        .then((response) => {
            console.log(response);
            setListGrid(<CourseGrid list={response.data} />);
        })
    },[])

    return (<>
    <Container style={{marginTop:"10%"}}>
        {listGrid}
    </Container>    
    </>)
}

export default CourseScrap;