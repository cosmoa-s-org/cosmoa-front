import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Select,
  MenuItem,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MapWrapper, {
  CourseDetailMapWrapper,
  CourseMapWrapper,
} from "../../map/MapWrapper";
import { call } from "../../service/ApiService";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styled from "@emotion/styled";

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
  padding: 5px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  height: 30px;
`;

function CourseDetail() {
  //-----------------------------------------------------함수 및 State 정의부-----------------------------------------------------
  const location = useLocation();

  const [CourseMap, setCourseMap] = useState("");
  const [markers, setMarkers] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [course, setCourse] = useState({
    course: {
      id: 0,
      name: "",
      description: "",
      createdDate: "",
      modifiedDate: "",
    },
    nickname: "",
    isLike: 0,
    like: 0,
  });
  const [placeListTable, setPlaceListTable] = useState(<>Loading...</>);
  const [like, setLike] = useState(false);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState();
  const [latlng, setLatlng] = useState({});
  const [rows, setRows] = useState([]);
  const [report, setReport] = useState([]);

  let userId = JSON.parse(localStorage.getItem("USER")).id;
  let nickname = JSON.parse(localStorage.getItem("USER")).nickname;

  const params = useParams();
  const cid = params.id;
  const M = window.M;
  const header = { "Content-Type": "application/json" };
  let navigate = useNavigate();

  // 좋아요 기능
  const likeClick = () => {
    if (like) {
      setLike(false);
      course.like -= 1;
      call(
        `/course-like`,
        "DELETE",
        header,
        JSON.stringify({ userId: userId, courseId: cid })
      );
    } else {
      setLike(true);
      course.like += 1;
      call(
        `/course-like`,
        "POST",
        header,
        JSON.stringify({ userId: userId, courseId: cid })
      );
    }
  };

  // 장소 상세보기로 이동
  const goPlaceDetail = (id) => {
    const data = id;
    navigate(`/placedetail/${id}`);
  };

  // 소요시간
  var totalCostTime = 0;

  // 댓글
  const onSubmit = (e) => {
    setInput(e.target.value);
    e.preventDefault();
  };

  // 댓글 추가
  const addComment = () => {
    const joinData = {
      userId: userId,
      courseId: cid,
      comment: input,
    };
    console.log(JSON.stringify(joinData));
    call(`/course-reply`, "POST", header, JSON.stringify(joinData)).then(
      (response) => {
        call(`/course-reply/${cid}`, "GET", header, null).then((response) => {
          setComments(response.data);
        });
      }
    );
    setInput("");
  };

  // 댓글 삭제
  const removeComment = (id) => {
    console.log(id);
    call(`/course-reply/${id}`, "DELETE", header, null).then((response) => {
      call(`/course-reply/${cid}`, "GET", header, null).then((response) => {
        setComments(response.data);
      });
    });
  };

  // 코스 삭제
  const courseDelete = (e) => {
    call(`/course/${cid}`, "DELETE", header, null);
  };

  // 신고창 표시
  const reportAppear = (e) => {
    const div = document.getElementById("reportDiv");

    if (div.style.display === "none") {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  };

  // 신고 상태값 셋팅
  const reportReason = (e) => {
    setReport(e.target.value);
  };

  // 신고하기
  function reportClick() {
    console.log(report);
    console.log(cid);
    console.log(userId);
    let data = { courseId: cid, userId: userId, type: report };
    call(`/course-report`, "POST", header, JSON.stringify(data));
  }
  //-----------------------------------------------------함수 및 State 정의부 끝-----------------------------------------------------

  //-----------------------------------------------------useEffect-----------------------------------------------------
  useEffect(() => {
    call(`/course/detail?courseId=${cid}&userId=${userId}`, "GET", {}, null) // 코스 정보 받아오기
      .then((response) => {
        setCourse(response.data);
        if (Number(response.data.isLike) === 1) {
          setLike(true);
        } else {
          setLike(false);
        }
      });

    call(`/course-compose/${cid}`, "GET", {}, null) // 코스에 포함된 장소 정보 받아오기
      .then((response) => {
        setPlaceList(response.data);

        let newlatlng = [];
        response.data.forEach((item, i) => {
          let lat = parseFloat(item.place.lat);
          let lng = parseFloat(item.place.lng);
          let pName = item.place.name;
          let pDesc = item.place.description;

          newlatlng.push({ lat: lat, lng: lng, pName: pName, pDesc: pDesc });
        });
        setRows(newlatlng);
        setLatlng(newlatlng);
        setCourseMap(
          <CourseMapWrapper
            rows={newlatlng}
            markers={markers}
            setMarkers={setMarkers}
            latlng={latlng}
          />
        );
      });

    call(`/course-reply/${cid}`, "GET", header, null).then((response) => {
      setComments(response.data);
    });
  }, []);

  useEffect(() => {
    setPlaceListTable(
      <>
        {placeList.map((item, i) => {
          totalCostTime += Number(item.costTime);
          return (
            <>
              <br />
              {/* 장소 카드 */}
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  onClick={() => {
                    setCourseMap(
                      <CourseMapWrapper
                        rows={rows}
                        markers={markers}
                        setMarkers={setMarkers}
                        latlng={{
                          lat: item.place.lat,
                          lng: item.place.lng,
                          pName: item.place.name,
                          pDesc: item.place.description,
                        }}
                      />
                    );
                    window.scrollTo(0, 0);
                  }}
                  component="img"
                  height="auto"
                  width
                  image={atob(item.place.image)}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    onClick={() => {
                      setCourseMap(
                        <CourseMapWrapper
                          rows={rows}
                          markers={markers}
                          setMarkers={setMarkers}
                          latlng={{
                            lat: item.place.lat,
                            lng: item.place.lng,
                            pName: item.place.name,
                            pDesc: item.place.description,
                          }}
                        />
                      );
                      window.scrollTo(0, 0);
                    }}
                  >
                    {item.place.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.place.description} <br />
                    {item.costTime}분
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      goPlaceDetail(item.id);
                    }}
                  >
                    자세히 보기
                  </Button>
                </CardActions>
              </Card>
              <br />
              <div>
                <ArrowDownwardIcon style={{ marginLeft: "50%" }} />
              </div>
            </>
          );
        })}
        <div style={{ textAlign: "center", marginLeft: "20px" }}>
          {totalCostTime}분 소요
        </div>
        <Divider />
      </>
    );
  }, [placeList]);

  //-----------------------------------------------------useEffect 끝-----------------------------------------------------

  return (
    <>
      <Box>
        <Typography variant="h3" style={{ marginTop: "5%", fontWeight: "600" }}>
          {course.course.name}
        </Typography>
        <Typography
          style={{ fontSize: "10px", textAlign: "right", marginRight: "10px" }}
        >
          by {course.nickname}
        </Typography>
        <Typography
          style={{ fontSize: "10px", textAlign: "right", marginRight: "10px" }}
        >
          {course.course.createdDate}
        </Typography>
      </Box>
      <Box>
        <div style={{ margin: "0 auto" }}>{CourseMap}</div>
        <Container style={{ textAlign: "initial" }}>
          <br />
          <Typography variant="h4" style={{ fontWeight: "500" }}>
            코스 순서{" "}
          </Typography>
          <Divider />
          {placeListTable} <br />
          <Typography style={{ fontSize: "medium" }}>
            {course.course.description}
          </Typography>
          <br />
          {/* 코스 삭제 버튼 */}
          <div style={{ textAlign: "right" }}>
            {userId === course.course.userId ? (
              <>
                <Button
                  onClick={courseDelete}
                  style={{ marginBottom: "5px", backgroundColor: "lightgray" }}
                >
                  코스 삭제
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
                  코스 신고
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
          <Divider />
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
                      {userId === comment.userId ? (
                        <>
                          <Button
                            onClick={() => removeComment(comment.courseReplyId)}
                          >
                            삭제
                          </Button>
                        </>
                      ) : null}
                    </div>
                  </UserInfoWrapper>
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

export default CourseDetail;
