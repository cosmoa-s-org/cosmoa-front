import { Box, Button, Card, Container, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import MapWrapper from "../../map/MapWrapper";
import { call } from "../../service/ApiService";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { positions } from "@mui/system";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import styled from "@emotion/styled";

const Like = styled.button`
  font-size : 30px;
  width : 30px;
  height : 30px;
  margin-left : 3%;
  border : 0;
  background-color : floralwhite;
`

function CourseDetail() {
    const [placeList, setplaceList] = useState([]);
    const [course, setCourse] = useState({
        course: { id: 0, name: "", description: "", createdDate: "", modifiedDate: "" },
        nickname: "", isLike: 0, like: 0
    });
    const [like, setLike] = useState(false);

    const likeClick = () => {
        if (like) {
            setLike(false)
            course.like -= 1;
            call(`/course-like`, "DELETE", JSON.stringify({userId: userId, courseId: cid}))
        } else {
            setLike(true)
            course.like += 1;
            call(`/course-like`, "POST", JSON.stringify({userId: userId, courseId: cid}))
        }
    }


    let userId = JSON.parse(localStorage.getItem("USER")).id

    const params = useParams();
    const cid = params.id

    const [placeListTable, setPlaceListTable] = useState(<>Loading...</>);

    useEffect(() => {
        call(`/course/detail?courseId=${cid}&userId=${userId}`, "GET", null) // 코스 정보 받아오기
            .then((response) => {
                console.log(response);
                setCourse(response.data);
                if (Number(response.data.isLike) === 1) {
                    setLike(true);
                } else {
                    setLike(false);
                }
                console.log(course.isLike);
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

    return (<>
        <Box>
            <Typography variant="h4" style={{ marginTop: "15%" }}>{course.course.name}</Typography>
            <Typography style={{ textAlign: "right" }}>by {course.nickname}</Typography>
            <Typography style={{ textAlign: "right" }}>{course.course.createdDate}</Typography>
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
                {like ? (
                    <Like size="20px"  onClick={likeClick}>
                        <ThumbUpAltIcon />
                    </Like>
                ) : (
                    <Like size="20px"  onClick={likeClick}>
                        <ThumbUpOffAltIcon />
                    </Like>
                )}

                <Card>{course.course.name}<br />
                    코스 순서 <br />
                    {placeListTable} <br />
                    {course.course.description}</Card>
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
