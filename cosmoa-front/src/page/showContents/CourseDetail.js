import { Box, Button, Card, Container, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import MapWrapper from "../../map/MapWrapper";
import { call } from "../../service/ApiService";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { positions } from "@mui/system";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';



function CourseDetail() {
    const [placeList, setplaceList] = useState([]);
    const [course, setCourse] = useState({
        course: { id: 0, name: "", description: "", createdDate: "", modifiedDate: "" },
        nickname: "", isLike: 0, like: 0
    });
    const [like, setLike] = useState(false);


    let userId = JSON.parse(localStorage.getItem("USER")).id

    const params = useParams();
    const cid = params.id

    const [placeListTable, setPlaceListTable] = useState(<>Loading...</>);

    useEffect(() => {
        call(`/course/detail?courseId=${cid}&userId=${userId}`, "GET", null) // 코스 정보 받아오기
            .then((response) => {
                console.log(response);
                setCourse(response.data);
            })
        call(`/course-compose/${cid}`, "GET", null) // 코스에 포함된 장소 정보 받아오기
            .then((response) => {
                console.log(response);
                setplaceList(response.data);
            })
    }, []);

    // useEffect( () => {
    //     let tmp = "";
    //     placeList.forEach((item, i) => {
    //         tmp += item.place.name
    //     })
    //     setPlaceListTable(<>
    //     {tmp}   
    //     </>);
    // }, [placeList])
    var totalCostTime = 0;

    useEffect(() => {
        setPlaceListTable(<>
            {placeList.map((item, i) => {
                totalCostTime += Number(item.costTime);
                console.log(totalCostTime);

                return (<>
                    {item.place.name} {item.costTime}{' => '}
                </>)
            })}{totalCostTime}
        </>);
    }, [placeList])


    const likeBtnClicked = (event) => {
        // likeBtn = like ? '<ThumbUpAltIcon />' : '<ThumbUpOffAltIcon />';
        return (<>
        </>)
    }



    return (<>
        <Box>
            <Typography variant="h4" style={{ marginTop: "15%" }}>{course.course.name}</Typography>
            <Typography variant="h6" style={{ textAlign: "right" }}>by {course.nickname}</Typography>
        </Box>
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
            <Container style={{ textAlign: "initial" }}>
                추천수 : {course.like}
                <Button
                    value="likeBtn"
                    style={{ backgroundColor: "floralwhite", flex: 1, alignItems: "center", flexDirection: "row" }}
                    onClick={likeBtnClicked}
                ><ThumbUpOffAltIcon /></Button>

                <Paper>{course.course.name}<br /></Paper>
                코스 순서 <br />
                {placeListTable} <br />
                <Paper>{course.course.description}</Paper>
                <br />
            </Container>
            <hr />
            {/* Reply */}
            <Container spacing={2}>
                <Grid item xs={12}>
                    <Card>댓글</Card>
                </Grid>
            </Container>

        </Box>
    </>)
}

export default CourseDetail;
