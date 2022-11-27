import React, { useEffect, useState } from "react";
import { call } from "../../service/ApiService";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  Select,
  MenuItem,
} from "@material-ui/core";
import styled from "@emotion/styled";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import logo from "../../images/cosmoa_full.png";
import lotteworld from "../../images/lotteworld.png";

const Like = styled.button`
  font-size: 30px;
  width: 30px;
  height: 30px;
  margin-left: 3%;
  border: 0;
  background-color: floralwhite;
  margin-top: 5px;
`;
const CommentWrapper = styled.div`
  border: 1px solid black;
  p {
    margin: 0;
  }
  width: 100%;
  height: auto;
  text-align: left;
  margin-top: 5px;
  padding: 10px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  height: 30px;
`;

function setImage(path) {
  var img = document.getElementById("placeImg");
  img.src = "/" + path;
  img.style.visibility = "visible";
  console.log(img.src);
}

function PopularPlace() {

  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(false);
  const [input, setInput] = useState();
  const [path, setPath] = useState("");
  const [report, setReport] = useState([]);

  const M = window.M;



  const likeClick = () => {
    if (like) {
      setLike(false);      
    } else {
      setLike(true);
    }
  };



  // 장소 삭제
  const placeDelete = (e) => {
  };

  // 신고 기능
  const reportAppear = (e) => {
    const div = document.getElementById("reportDiv");

    if (div.style.display === "none") {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  };

  const reportReason = (e) => {
    setReport(e.target.value);
  };


  return (
    <>
      <Box>
        <Typography variant="h4" style={{ marginTop: "5%" }}>
          서울 롯데타워
        </Typography>
        <Typography style={{ fontSize: "10px", textAlign: "right", marginRight: "10px" }}>
          ss
        </Typography>
        {/* <Typography style={{ textAlign: "right" }}>{course.course.createdDate}</Typography> */}
      </Box>
      <Box>
        <Card sx={{ maxWidth: 300 }}>
          <CardMedia
            component="img"
            height="auto"
            style={{ padding: "5px" }}
            width
            image={lotteworld}
          />
        </Card>
        <Container style={{ textAlign: "initial" }}>
          추천수 : 14
          {like ? (
            <Like size="20px" onClick={likeClick}>
              <ThumbUpAltIcon />
            </Like>
          ) : (
            <Like size="20px" onClick={likeClick}>
              <ThumbUpOffAltIcon />
            </Like>
          )}
          <Typography style={{ fontSize: "medium" }}>
          123층 높이의 대규모 초고층 건물에 고급 호텔과 멋진 전망을 볼 수 있는 전망대가 있습니다.
          </Typography>
        </Container>
        <hr />
        {/* Reply */}
        <Container spacing={2}>
          <form>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              column={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={8}>
                <input
                  type="text"
                  className="inputComment"
                  placeholder="댓글 적기"
                  style={{ width: "100%", height: "40px" }}
                  name="content"
                  value={input}
                ></input>
              </Grid>
              <Grid item xs={2}>
                <Button
                  style={{ 
                  height: "100%",
                  backgroundColor: "#55A9DD",
                  color: "white",
                  fontWeight: "bold",
                  marginLeft: "5%",
                  width: "90%", }}
                >
                  사진선택
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  style={{
                    height: "100%",
                    backgroundColor: "#55A9DD",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  등록
                </Button>
                <br />
              </Grid>
              <img id="placeImg" style={{ visibility: "hidden" }} src="" />
              {comments.map((comment, index) => (
                <CommentWrapper key={`${comment.nickname}_${index}`}>
                  <UserInfoWrapper>
                    <Typography>{comment.nickname}</Typography>
                    <div>
                        <Button>
                          신고
                        </Button>
                    </div>
                  </UserInfoWrapper>
                  <Card sx={{ maxWidth: 150 }}>
                    <CardMedia
                      component="img"
                      style={{ width: "50%" }}
                      image={atob(comment.img)}
                    />
                  </Card>
                  {comment.comment}
                </CommentWrapper>
              ))}
            </Grid>
          </form>
        </Container>
      </Box>
    </>
  );
                      }
                      

export default PopularPlace;
