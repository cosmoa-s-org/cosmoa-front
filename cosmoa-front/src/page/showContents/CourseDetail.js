import { Box, Button, Container, Divider, Grid, Paper, TextField, Typography, Card, CardContent, CardActions, CardMedia } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import MapWrapper from "../../map/MapWrapper";
import { call } from "../../service/ApiService";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { positions } from "@mui/system";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styled from "@emotion/styled";
import PlaceCard from "./PlaceCard";

const Like = styled.button`
  font-size : 30px;
  width : 30px;
  height : 30px;
  margin-left : 3%;
  border : 0;
  background-color : floralwhite;
`
const CommentWrapper = styled.div`
  border: 1px solid black;
  p{
    margin: 0;
  }
  width : 100%;
  height : auto;
  text-align : left;
  margin-top : 5px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  height : 30px;
`;

function CourseDetail() {
    const [placeList, setplaceList] = useState([]);
    const [course, setCourse] = useState({
        course: { id: 0, name: "", description: "", createdDate: "", modifiedDate: "" },
        nickname: "", isLike: 0, like: 0
    });
    const [placeListTable, setPlaceListTable] = useState(<>Loading...</>);
    const [like, setLike] = useState(false);
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState();

    let userId = JSON.parse(localStorage.getItem("USER")).id
    let nickname = JSON.parse(localStorage.getItem("USER")).nickname

    const params = useParams();
    const cid = params.id
    const M = window.M;
    const header = { "Content-Type": "application/json" }


    const likeClick = () => {
        if (like) {
            setLike(false)
            course.like -= 1;
            call(`/course-like`, "DELETE", header, JSON.stringify({ userId: userId, courseId: cid }))
        } else {
            setLike(true)
            course.like += 1;
            call(`/course-like`, "POST", header, JSON.stringify({ userId: userId, courseId: cid }))
        }
    }

    useEffect(() => {
        call(`/course/detail?courseId=${cid}&userId=${userId}`, "GET", header, null) // 코스 정보 받아오기
            .then((response) => {
                console.log(response);
                setCourse(response.data);
                if (Number(response.data.isLike) === 1) {
                    setLike(true);
                } else {
                    setLike(false);
                }
            })
        call(`/course-compose/${cid}`, "GET", {}, null) // 코스에 포함된 장소 정보 받아오기
            .then((response) => {
                console.log(response);
                setplaceList(response.data);
            })
    }, []);

    // 소요시간
    var totalCostTime = 0;
    useEffect(() => {
        setPlaceListTable(<>
            {placeList.map((item, i) => {
                totalCostTime += Number(item.costTime);
                return (<>
                        {/* <img
                            id="placeImg"
                            src={"data:image/png;base64," + item.place.image}
                            width="100px"
                            height="100px"
                        /> */}
                        <br />
                        <Card sx={{ maxWidth: 300 }}>
                            <CardMedia
                                component="img"
                                height="auto"
                                image={"data:image/png;base64," + item.place.image}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.place.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.place.description} <br />
                                    {item.costTime}분
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">자세히 보기</Button>
                            </CardActions>
                        </Card>
                        <br />
                        <div>
                        <ArrowDownwardIcon style={{marginLeft:"50%"}} />
                        </div>
                </>)
            })}<div style={{textAlign:"center"}}>{totalCostTime}분 소요</div><Divider />

        </>);
    }, [placeList])

    // 댓글

    useEffect(() => {
        call(`/course-reply/${cid}`, "GET", header, null)
            .then((response) => {
                console.log(response);
                setComments(response.data);
                console.log(comments);
            })
    }, []);

    const onSubmit = (e) => {
        setInput(e.target.value);
        e.preventDefault();

    }

    const addComment = () => { // 댓글 추가
        // setComments(
        //     comments.concat({
        //         id: comments.length + 1,
        //         comment: input,
        //         nickname: nickname,
        //     })
        // );
        const joinData = {
            userId: userId,
            courseId: cid,
            comment: input,
        }
        console.log(JSON.stringify(joinData));
        call(`/course-reply`, "POST", header, JSON.stringify(joinData))
        setInput("");
        // console.log(comments);
        window.location.reload();
    };

    const removeComment = (id) => { // 댓글 삭제
        console.log(id);
        call(`/course-reply/${id}`, "DELETE", header, null)
        // return setComments(comments.filter((comment) => comment.id !== id));
        window.location.reload();
    };

    const changeComment = (id, inputWord) => { // 댓글 수정
        setComments(comments.map((comment) => {
            if (comment.id === id) {
                return {
                    ...comment,
                    content: inputWord,
                };
            }
            return comment;
        }));
        setInput("");
    };


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

                <br />
                    <Typography variant="h5">코스 순서 </Typography>
                    <Divider />
                    {placeListTable} <br />
                    {course.course.description}
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
                                value={input}
                                onChange={onSubmit}
                            ></input>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                style={{ backgroundColor: "lightgray" }}
                                onClick={() => {
                                    addComment(input);
                                    setInput("");
                                }}
                            >
                                등록
                            </Button>
                        </Grid>
                        {comments.map((comment, index) => (
                            <CommentWrapper key={`${comment.nickname}_${index}`}>
                                <UserInfoWrapper>
                                    <Typography>{comment.nickname}</Typography>
                                    <div>
                                        {comment.createdDate}
                                        {
                                            userId === comment.userId
                                                ? <><Button onClick={() => removeComment(comment.courseReplyId)}>삭제</Button>
                                                    <Button onClick={() => changeComment(comment.courseReplyId)}>수정</Button></>
                                                : null
                                        }
                                    </div>
                                </UserInfoWrapper>
                                {comment.comment}
                            </CommentWrapper>
                        ))}
                    </Grid>
                </form>
            </Container>
        </Box>
    </>)
}

export default CourseDetail;
