import { Box, Paper } from "@material-ui/core";
import React from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";

function CourseDetail() {

    const params = useParams();
    const id = params.id

    console.log(params);
    // const navigate = useNavigate();
    // const location = useLocation();

    // console.log({ navigate, location, params })
    

    return (<>
        Course Detail Page
        <h2>{id}</h2>
        <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 128,
              height: 128,
            },
          }}>
            <Paper elevation={1} >{id}번코스 네임</Paper>
        </Box>
    </>)
}

export default CourseDetail;
