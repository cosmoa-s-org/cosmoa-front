import { Box, Button, Card, Container, Divider, Grid, Paper, TextField, Typography } from "@material-ui/core";
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
const CommentWrapper = styled.div`
  border: 1px solid black;
  p{
    margin: 0;
  }
  width : 100%;
  height : 60px;
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
    const [reply, setReply] = useState('');
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState();



    let userId = JSON.parse(localStorage.getItem("USER")).id
    let nickname = JSON.parse(localStorage.getItem("USER")).nickname

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
        setInput(e.target.value);
        e.preventDefault();
        // const data = new FormData(e.currentTarget);
        // const content = {
        //     content: data.get('content')
        // }

        // setReply(JSON.stringify(content));
        // console.log(reply);
    }

    const addComment = () => { // 댓글 추가
        console.log(input);
        setComments(
            comments.concat({
                id: comments.length + 1,
                content: input,
                userName: nickname,
            })
        );
        setInput("");
    };

    const removeComment = (id) => { // 댓글 삭제
        return setComments(comments.filter((comment) => comment.id !== id));
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
                                    value={input}
                                    onChange={onSubmit}
                                ></input>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    style={{backgroundColor : "lightgray"}}
                                    onClick={() => {
                                        addComment(input);
                                        setInput("");
                                    }}
                                >
                                    등록
                                </Button>
                            </Grid>
                            {comments.map((comment, index) => (
                                <CommentWrapper key={`${comment.userName}_${index}`}>
                                    <UserInfoWrapper>
                                        <p>{comment.userName}</p>
                                        
                                        <Button onClick={() => removeComment(comment.id)}>삭제</Button>
                                    </UserInfoWrapper>
                                    {comment.content}
                                </CommentWrapper>
                            ))}
                    </Grid>
                </form>

            </Container>
        </Box>
    </>)
}

export default CourseDetail;
