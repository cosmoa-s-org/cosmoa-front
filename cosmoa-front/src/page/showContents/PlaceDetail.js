import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { call } from "../../service/ApiService";
import { Box, Button, Container, Divider, Grid, Paper, TextField, Typography, Card, CardMedia } from "@material-ui/core";
import styled from "@emotion/styled";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

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

function PlaceDetail() {
    const [place, setPlace] = useState({});
    const [comments, setComments] = useState([]);
    const [like, setLike] = useState(false);
    const [input, setInput] = useState();

    const params = useParams();
    const pid = params.id;
    const header = { "Content-Type": "application/json" }

    let userId = JSON.parse(localStorage.getItem("USER")).id


    useEffect(() => {
        call(`/place/detail/${pid}`, "GET", {}, null)
            .then((response) => {
                console.log(response);
                setPlace(response.data);
            });

        call(`/place-reply/${pid}`, "GET", {}, null)
            .then((response) => {
                console.log(response);
                setComments(response.data);
            });
    }, []);

    const likeClick = () => {
        if (like) {
            setLike(false)
            place.like -= 1;
            call(`/place-like`, "DELETE", header, JSON.stringify({ userId: userId, placeId: pid }))
        } else {
            setLike(true)
            place.like += 1;
            call(`/place-like`, "POST", header, JSON.stringify({ userId: userId, placeId: pid }))
        }
    }

    useEffect(() => {
        call(`/place-reply/${pid}`, "GET", header, null)
            .then((response) => {
                console.log(response);
                setComments(response.data);
                console.log(comments);
            })
    }, []);

    // 댓글
    const onSubmit = (e) => {
        setInput(e.target.value);
        e.preventDefault();
    }

    const addComment = () => { // 댓글 추가
        const joinData = {
            userId: userId,
            placeId: pid,
            comment: input,
        }
        console.log(JSON.stringify(joinData));
        call(`/place-reply`, "POST", header, JSON.stringify(joinData))
        setInput("");
        window.location.reload();
    };

    const removeComment = (id) => { // 댓글 삭제
        console.log(id);
        call(`/place-reply/${id}`, "DELETE", header, null)
        // return setComments(comments.filter((comment) => comment.id !== id));
        window.location.reload();
    };

    return (<>
        <Box>
            <Typography variant="h4" style={{ marginTop: "15%" }}>장소 이름</Typography>
            <Typography style={{ textAlign: "right" }}>by 유저 닉네임</Typography>
            {/* <Typography variant="h4" style={{ marginTop: "15%" }}>{place.name}</Typography>
            <Typography style={{ textAlign: "right" }}>by {place.nickname}</Typography> */}
            {/* <Typography style={{ textAlign: "right" }}>{course.course.createdDate}</Typography> */}
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

            <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                    component="img"
                    height="auto"
                    width
                    // image={atob(place.image)}
                />
            </Card>
            <Container style={{ textAlign: "initial" }}>
                추천수 : {place.like}
                {like ? (
                    <Like size="20px" onClick={likeClick}>
                        <ThumbUpAltIcon />
                    </Like>
                ) : (
                    <Like size="20px" onClick={likeClick}>
                        <ThumbUpOffAltIcon />
                    </Like>
                )}
                <Typography>장소 상세설명</Typography>
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
                                                ? <Button onClick={() => removeComment(comment.placeReplyId)}>삭제</Button>
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

export default PlaceDetail;