import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { call } from "../../service/ApiService";

function PostedCourse() {

    let userId = JSON.parse(localStorage.getItem("USER")).id
    const header = { "Content-Type": "application/json" }


    useEffect(() => {
        call(`/place/posted-course?userId=${userId}`, "GET", header, null)
            .then((response) => {
                console.log(response.data);
            })
    })



    return (<>
        <Container style={{ marginTop: "10%" }}>
            등록한 코스
        </Container>
    </>)
}

export default PostedCourse;