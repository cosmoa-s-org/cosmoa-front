import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { call } from "../../service/ApiService";

function CourseReportList(props) {
  const courseReports = props.courseReports;
  const defaultImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII=";
  
  const typeToString = (type) => {
      if (Number(type) === 1) return "부적절한 내용의 게시물";
      else if (Number(type) === 2) return "음란물이 포함된 게시물";
      else if (Number(type) === 3) return "광고성 게시물"; 
  };

  const createReportItems = (list) => {
      let items = [];

      list.forEach((item, i) => {
          items.push((
          <Grid item xs={12} key={item.id}> 
              <Grid container> 
                  <Grid item xs={2}>{item.nickname}</Grid>
                  <Grid item xs={3}>{item.email}</Grid>
                  <Grid item xs={7}>{typeToString(item.type)}</Grid>
              </Grid>
          </Grid>));
      });

      return items;
  }

  const onDeleteBtnClicked = (course, reports) => {
    let formData = new FormData();
    formData.append("name", "신고 누적으로 인해 삭제된 코스");
    formData.append("description", "관리자의 요청에 따라 삭제된 코스입니다.");
    
    call(`/course/${course.id}`, "PUT", {}, formData)
    .then((response) => {
        window.alert("해당 코스가 관리자의 요청으로 삭제되었습니다.");
    });

    // report 상태를 1 -> 2로 바꾸기
    let data = [];
    reports.forEach((report, i) => {
        data.push(report.id);
    });

    // call(`/course-report/complete`, "POST", {"Content-Type": "application/json"}, JSON.stringify(data))
    // .then((response) => {
    //     console.log(response);
    // });
}

const onRejectBtnClicked = () => {
    window.alert("해당 코스에 대한 신고 처리가 완료되었습니다.")
    
    // report 상태를 1-> 2로 바꾸기
}

  return (<>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">코스 신고 목록</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseReports.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row"
                      align="center"
                  >
                    <Accordion>
                          <AccordionSummary
                          expandIcon={"▼"}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          >
                              <Grid container spacing={2}>
                                  <Grid item xs={1} style={{border: "1px solid black", textAlign: "left"}}>
                                      <span style={{}}>코스번호</span>
                                  </Grid>
                                  <Grid item xs={1} style={{border: "1px solid black", textAlign: "left", fontWeight: "bolder"}}>
                                      <span style={{}}>{item.course.id}</span>
                                  </Grid>
                                  <Grid item xs={1} style={{border: "1px solid black", textAlign: "left"}}>
                                      <span style={{}}>코스명</span>
                                  </Grid>
                                  <Grid item xs={4} style={{border: "1px solid black", textAlign: "left"}}>
                                      <span style={{}}>{item.course.name}</span>
                                  </Grid>
                                  <Grid item xs={2} style={{border: "1px solid black", textAlign: "left"}}>
                                      <span style={{color: "red", fontWeight: "bolder"}}>신고 누적 건수</span>
                                  </Grid>
                                  <Grid item xs={3} style={{border: "1px solid black", textAlign: "left"}}>
                                      <span style={{fontSize: "18px", color: "red", fontWeight: "bolder"}}>{item.courseReportUserList.length}</span>
                                  </Grid>
                              </Grid>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Grid container spacing={2}>
                                  <Grid item xs={4} style={{border: "1px solid black", textAlign: "center"}}>
                                      <a href={`/coursedetail/${item.course.id}`}>해당 코스 상세보기</a>
                                      {/* <img src={item.image ? atob(item.image) : defaultImageUrl} height={200} style={{border: "1px solid black", textAlign: "left"}}/> */}
                                  </Grid>
                                  <Grid item xs={8} style={{border: "1px solid black", textAlign: "center"}}>
                                      <Grid container spacing={2}>
                                          <Grid item xs={4} style={{border: "1px solid black", textAlign: "left"}}>
                                              설명
                                          </Grid>
                                          <Grid item xs={8} style={{border: "1px solid black", textAlign: "left"}}>
                                          {item.course.description}
                                          </Grid>
                                          <Grid item xs={4} style={{border: "1px solid black", textAlign: "left"}}>
                                              작성일 | 수정일
                                          </Grid>
                                          <Grid item xs={4} style={{border: "1px solid black", textAlign: "left"}}>
                                              {item.course.createdDate}
                                          </Grid>
                                          <Grid item xs={4} style={{border: "1px solid black", textAlign: "left"}}>
                                              {item.course.modifiedDate}
                                          </Grid>
                                          <Grid item xs={4} style={{border: "1px solid black", textAlign: "left"}}>
                                              작성자 닉네임
                                          </Grid>
                                          <Grid item xs={8} style={{border: "1px solid black", textAlign: "left"}}>
                                              {item.user.nickname}
                                          </Grid>
                                          <Grid item xs={6} style={{border: "1px solid black", textAlign: "center"}}>
                                              <Button variant="outlined"
                                              onClick={() => {
                                                onDeleteBtnClicked(item.course)
                                              }}
                                              >삭제 처리</Button>
                                          </Grid>
                                          <Grid item xs={6} style={{border: "1px solid black", textAlign: "center"}}>
                                              <Button variant="outlined"
                                              onClick={() => {
                                                onRejectBtnClicked()
                                              }}
                                              >삭제 반려</Button>
                                          </Grid>
                                      </Grid>
                                  </Grid>
                                  <Grid item xs={12} style={{marginTop: "10px"}}>
                                      <Grid container spacing={2} style={{border: "1px solid black", textAlign: "center"}}>
                                          <Grid item xs={2}>신고자 닉네임</Grid>
                                          <Grid item xs={3}>신고자 이메일</Grid>
                                          <Grid item xs={7}>신고 유형</Grid>
                                          {/* 신고 목록 출력 */}
                                          {createReportItems(item.courseReportUserList)}
                                      </Grid>
                                  </Grid>
                              </Grid>
                          </AccordionDetails>
                      </Accordion>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>);
}

export default CourseReportList