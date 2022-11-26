import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [place, setPlace] = useState({
    image: "",
    isLike: "",
    like: "",
    nickname: "",
    place: {
      address: "",
      createdDate: "",
      description: "",
      id: "",
      imgPath: "",
      lat: "",
      lng: "",
      modifiedDate: "",
      name: "",
      userId: "",
    },
  });
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(false);
  const [input, setInput] = useState();
  const [path, setPath] = useState("");
  const [report, setReport] = useState([]);

  const params = useParams();
  const pid = params.id; // 장소 id
  const header = { "Content-Type": "application/json" };
  const M = window.M;

  let userId = JSON.parse(localStorage.getItem("USER")).id;

  useEffect(() => {
    call(
      `/place/detail?placeId=${pid}&userId=${userId}`,
      "GET",
      header,
      null
    ).then((response) => {
      console.log(response);
      setPlace(response.data);
      if (Number(response.data.isLike) === 1) {
        setLike(true);
      } else {
        setLike(false);
      }
    });

    call(`/place-reply/${pid}`, "GET", header, null).then((response) => {
      console.log(response);
      setComments(response.data);
    });
  }, []);

  const likeClick = () => {
    if (like) {
      setLike(false);
      place.like -= 1;
      call(
        `/place-like`,
        "DELETE",
        header,
        JSON.stringify({ userId: userId, placeId: pid })
      );
    } else {
      setLike(true);
      place.like += 1;
      call(
        `/place-like`,
        "POST",
        header,
        JSON.stringify({ userId: userId, placeId: pid })
      );
    }
  };

  // 댓글
  const onSubmit = (e) => {
    setInput(e.target.value);
    e.preventDefault();
  };

  // 댓글 이미지 선택
  const SelectImgBtnClick = (event) => {
    // const path = "";
    M.media.picker({
      mode: "SINGLE",
      media: "PHOTO",
      column: 3,
      callback: function (status, result) {
        setPath(result.path);
        console.log(status + ", " + JSON.stringify(result));
        console.log(path);
        if (status === "SUCCESS") {
          M.file.read({
            path: result.path,
            encoding: "BASE64",
            indicator: true,
            callback: function (status, result) {
              console.log(status + JSON.stringify(result));

              var img = document.getElementById("placeImg");

              //mime-type은 별도로 스크립트에서 지정 필요
              img.src = "data:image/png;base64," + result.data;

              img.style.width = "250px";
              img.style.height = "250px";
            },
          });
        }
      },
    });
    console.log("click");

    // 미리보기 이미지 변경
    setImage(path);
  };

  const addComment = () => {
    // 댓글 추가
    var img = document.getElementById("placeImg");
    console.log(img);
    const data = new FormData();
    data.append("userId", userId);
    data.append("placeId", pid);
    data.append("comment", input);
    if (img.width !== 0) {
      let imgFile = new File([img.src], "img", { type: "image/png" });
      data.append("img", imgFile);
      console.log(imgFile);
    } else {
      data.append("img", logo);
      // data.append('img', 로고사진);
    }


    console.dir(data);
    call(`/place-reply`, "POST", {}, data).then((response) => {
      call(`/place-reply/${pid}`, "GET", header, null).then((response) => {
        setComments(response.data);
      });
    });
    setInput("");
    // window.location.reload();
  };

  const removeComment = (id) => {
    // 댓글 삭제
    console.log(id);
    call(`/place-reply/${id}`, "DELETE", header, null).then((response) => {
      call(`/place-reply/${id}`, "GET", header, null).then((response) => {
        setComments(response.data);
      });
    });
    // return setComments(comments.filter((comment) => comment.id !== id));
    // window.location.reload();
  };

  // 장소 삭제
  const placeDelete = (e) => {
    call(`/place/${pid}`, "DELETE", header, null);
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

  function reportClick() {
    console.log(report);
    console.log(pid);
    console.log(userId);
    let data = { placeId: pid, userId: userId, type: report };
    call(`/place-report`, "POST", header, JSON.stringify(data)).then(
      (response) => {
        M.pop.alert("신고가 완료되었습니다.");
      }
    );
  }

  return (
    <>
      <Box>
        <Typography variant="h4" style={{ marginTop: "5%" }}>
          {place.place.name}
        </Typography>
        <Typography style={{ fontSize: "10px", textAlign: "right", marginRight: "10px" }}>
          by {place.nickname}
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
            image={atob(place.image)}
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
          <Typography style={{ fontSize: "medium" }}>
            {place.place.description}
          </Typography>
          {/* 장소 삭제 및 신고 */}
          <div style={{ textAlign: "right" }}>
            {userId === place.place.userId ? (
              <>
                <Button
                  onClick={placeDelete}
                  style={{ marginBottom: "5px", backgroundColor: "lightgray" }}
                >
                  장소 삭제
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="red"
                  onClick={reportAppear}
                  style={{ marginBottom: "5px" }}
                >
                  장소 신고
                </Button>
                <div id="reportDiv" hidden>
                  <Box width="50%" style={{ marginLeft: "auto" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={report}
                      label="신고사유"
                      onChange={reportReason}
                      fullWidth
                      style={{ textAlign: "justify" }}
                    >
                      <MenuItem value={1}>부적절한 내용의 게시물</MenuItem>
                      <MenuItem value={2}>음란물이 포함된 게시물</MenuItem>
                      <MenuItem value={3}>광고성 게시물</MenuItem>
                    </Select>
                    <Button onClick={reportClick}>신고하기</Button>
                  </Box>
                </div>
              </>
            )}
          </div>
        </Container>
        <hr />
        {/* Reply */}
        <Container spacing={2}>
          <form onSubmit={onSubmit}>
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
                  onChange={onSubmit}
                ></input>
              </Grid>
              <Grid item xs={2}>
                <Button
                  onClick={SelectImgBtnClick}
                  style={{ backgroundColor: "lightgray", fontSize: "smaller" }}
                >
                  사진선택
                </Button>
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
                <br />
              </Grid>
              <img id="placeImg" style={{ visibility: "hidden" }} src="" />
              {comments.map((comment, index) => (
                <CommentWrapper key={`${comment.nickname}_${index}`}>
                  <UserInfoWrapper>
                    <Typography>{comment.nickname}</Typography>
                    <div>
                      {comment.createdDate}
                      {userId === comment.userId ? (
                        <Button onClick={() => removeComment(comment.id)}>
                          삭제
                        </Button>
                      ) : null}
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
