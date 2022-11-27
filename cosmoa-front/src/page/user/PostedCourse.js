import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { call } from "../../service/ApiService";
import CourseGrid from "../../components/Grid/CourseGrid";

function PostedCourse() {
    let userId = JSON.parse(localStorage.getItem("USER")).id
    const header = { "Content-Type": "application/json" }
    const [listGrid, setListGrid] = useState(<></>);

    useEffect(() => {
        call(`/course/posted-course?userId=${userId}`, "GET", header, null)
            .then((response) => {
                console.log(response);
                setListGrid(<CourseGrid list={response.data} />);
            })
    },[])

    return (<>
        <Grid container spacing={2}>
        {listGrid}
        </Grid>
    </>)
}

export default PostedCourse;