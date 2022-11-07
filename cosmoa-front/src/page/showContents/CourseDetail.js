import { Box, Paper } from "@material-ui/core";
import React from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import MapWrapper from "../../map/MapWrapper";
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
            <div style={{ margin: "0 auto" }}>
                <MapWrapper />
            </div>
            <Paper>{id}번코스 네임</Paper>
            <Paper>코스 순서</Paper>
            <Paper>설명</Paper>

        </Box>
    </>)
}

export default CourseDetail;
