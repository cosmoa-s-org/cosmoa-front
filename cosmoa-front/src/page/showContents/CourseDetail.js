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
    const [placeListTable, setPlaceListTable] = useState(<>Loading...</>);
    const [like, setLike] = useState(false);
    const [reply, setReply] = useState('');


    let userId = JSON.parse(localStorage.getItem("USER")).id

    const params = useParams();
    const cid = params.id


    const likeClick = () => {
        if (like) {
            setLike(false)
            course.like -= 1;
            call(`/course-like`, "DELETE", JSON.stringify({ userId: userId, courseId: cid }))
        } else {
            setLike(true)
            course.like += 1;
            call(`/course-like`, "POST", JSON.stringify({ userId: userId, courseId: cid }))
        }
    }

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
    // 소요시간
    useEffect(() => {
        setPlaceListTable(<>
            {placeList.map((item, i) => {
                totalCostTime += Number(item.costTime);
                return (<>
                    {item.place.name} {item.costTime}{' => '}
                </>)
            })}{totalCostTime}
        </>);
    }, [placeList])

    // 댓글
    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const content = data.get('content');
        
        setReply(JSON.stringify(content));
        console.log(reply);
        addReply();
    }

    function addReply() {
        console.log(reply);
        return(<>
        <div>내용 : {reply}</div>
        </>)
    }

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
                    <Like size="20px" onClick={likeClick}>
                        <ThumbUpAltIcon />
                    </Like>
                ) : (
                    <Like size="20px" onClick={likeClick}>
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
                <form onSubmit={onSubmit}>
                    <Grid container spacing={{ xs: 2, md: 3 }} column={{ xs: 4, sm: 8, md: 12 }} >
                        <Grid item xs={10}>
                            <input
                                type="text"
                                className="inputComment"
                                placeholder="댓글 적기"
                                style={{ width: "100%", height: "40px" }}
                                name="content"
                            >
                            </input>
                        </Grid>
                        <Grid item xs={2}><Button type="submit">등록</Button></Grid>
                        <addReply />
                    </Grid>
                </form>

            </Container>
        </Box>
    </>)
}

export default CourseDetail;
