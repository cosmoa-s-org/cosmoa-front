import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { call } from "../../service/ApiService";

function CourseScrap() {
    let userId = JSON.parse(localStorage.getItem("USER")).id
    const header = { "Content-Type": "application/json" }


    useEffect( () => {
        call(`/course/posted-course?userId=${userId}`, "GET", header, null)
        .then((response) => {
            console.log(response.data);
        })
    })



    return (<>
    <Container style={{marginTop:"10%"}}>
        스크랩한 코스
    </Container>    
    </>)
}

export default CourseScrap;