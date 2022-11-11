import { Box, Button, Container, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import MapWrapper from "../../map/MapWrapper";
import { call } from "../../service/ApiService";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { positions } from "@mui/system";

function CourseDetail() {
    const [placeList, setplaceList] = useState([]);
    const [course, setCourse] = useState([]);

    const params = useParams();
    const cid = params.id

    // useEffect(() => {
    //     call(`/course/${cid}`, "GET", null)
    //         .then((response) => {
    //             setCourse(response.data);
    //         })
    //     call(`/course-compose/${cid}`, "GET", null)
    //         .then((response) => {
    //             console.log(response);
    //             setplaceList(response.data);
    //         })
    // }, []);

    // console.log(placeList);

    return (<>
        <Typography variant="h4" style={{ marginTop: "15%" }}>코스 이름</Typography>
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
            <Container style={{ textAlign : "initial" }}>
                <Box
                >
                    <Button
                    style={{ backgroundColor: "floralwhite", flex: 1, alignItems: "center", flexDirection: "row" }}

                    ><ThumbUpAltIcon /><ThumbUpOffAltIcon /></Button>
                </Box>

                <Paper>{cid}</Paper>
                <Paper>코스 순서</Paper>
                <Paper>설명</Paper>
            </Container>
        </Box>
    </>)
}

export default CourseDetail;
