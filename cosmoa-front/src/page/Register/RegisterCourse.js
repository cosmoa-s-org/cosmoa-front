import React from "react";
import {
  Box,
  Link,
  Button,
  Container,
  Grid,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import MapWrapper from "../../map/MapWrapper";

function RegisterCourse(props) {
  // 제출 버튼 눌렀을때 이벤트 작성 필요
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  function createData(num, placeName, placeAddress, costTime) {
    return { num, placeName, placeAddress, costTime };
  }

  const rows = [
    createData(1, "구미AA", "구미시 ㅁㅁ동 159", "30분"),
    createData(2, "구미BB", "구미시 ㄴㄴ동 237", "15분"),
    createData(3, "구미CC", "구미시 ㅇㅇ동 262", "45분"),
    createData(4, "구미DD", "구미시 ㄹㄹ동 305", "1시간"),
  ];

  return (
    <>
      <h1>Register Course Page</h1>

      {/* 나중에 CourseMaps.js로 변경 */}
      <MapWrapper />

      <Container component="main" maxWidth="xs" style={{ marginTop: "3%" }}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="courseName"
                name="courseName"
                variant="outlined"
                required
                id="courseName"
                label="코스 이름"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="courseDescription"
                name="courseDescription"
                variant="outlined"
                required
                id="courseDescription"
                label="코스 설명"
              />
            </Grid>

            <br />

            <Grid item xs={12}>
              <Link href="/addplace">
                <Button variant="contained">장소 추가</Button>
              </Link>
            </Grid>
            {/* <input type="text" >장소1</input>
                <input type="text" >장소1 소요시간</input> */}

            <br />

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width={"15%"}>코스 순서</TableCell>
                    <TableCell align="center">장소명</TableCell>
                    <TableCell align="center">주소</TableCell>
                    <TableCell align="center" width={"22%"}>소요시간</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.placeName}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.num}
                      </TableCell>
                      <TableCell align="center">{row.placeName}</TableCell>
                      <TableCell align="center">{row.placeAddress}</TableCell>
                      <TableCell align="center">
                        <TextField value={row.costTime}></TextField>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <br />

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                sx={{ mt: 4, mb: 2 }}
                size="large"
                color="primary"
                onClick={handleSubmit}
              >
                제출하기
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

      <br />

      <Button variant="contained" href="/main">
        메인으로
      </Button>
    </>
  );
}

export default RegisterCourse;
