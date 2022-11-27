import React, { useEffect, useRef, useState } from "react";
import {
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
import MapWrapper, {
  AddPlaceMapWrapper,
  CourseMapWrapper,
} from "../../map/MapWrapper";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { registerCourse } from "../../service/ApiService";

function RegisterCourse(props) {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [rows, setRows] = useState([]);
  //const [composeList, setComposeList] = useState([]);
  const courseListRef = useRef(null);
  const [registerCourseMap, setRegisterCourseMap] = useState("");
  const placeListRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [latlng, setLatlng] = useState({lat:36.1461, lng:128.3936});

  // 제출 버튼 눌렀을때 이벤트 작성 필요
  const handleSubmit = (event) => {
    event.preventDefault();

    const M = window.M;

    let submitTmp = [...rows];
    let composeList = [];
    let checkCostTime = false;

    if (courseName === "") {
      M.pop.alert("코스 이름을 입력하세요!");
      return;
    }
    if (courseDescription === "") {
      M.pop.alert("코스 설명을 입력하세요!");
      return;
    }
    if (submitTmp.length == 0) {
      M.pop.alert("장소를 추가하세요!");
      return;
    }

    submitTmp.forEach((row, i) => {
      // 예외처리 - costTime 비어있을 때
      if (row.costTime == null || row.costTime == "") {
        M.pop.alert("소요시간을 입력하세요!");
        checkCostTime = true;
        return;
      }
      if (row.costTime == "0") {
        M.pop.alert("소요시간에 0이 아닌 수를 입력해주세요!");
        checkCostTime = true;
        return;
      }

      row.sequence = i + 1;
      composeList.push(row);
    });

    if (checkCostTime == true) {
      return;
    }

    let courseData = {
      course: {
        userId: JSON.parse(localStorage.getItem("USER")).id,
        name: courseName,
        description: courseDescription,
      },
      compose: composeList,
    };

    onhandlePost(JSON.stringify(courseData));

    // 제출시 로컬 스토리지 초기화
    localStorage.setItem("courseName", "");
    localStorage.setItem("courseDescription", "");
    localStorage.setItem("placeItems", "");
    localStorage.setItem("AddPlaceDesc", "");
  };

  const onhandlePost = async (data) => {
    console.log(data);
    registerCourse(data).then((response) => {
      console.log(response);
      console.log("성공");
      console.log(data);
    });
  };

  // 장소추가 버튼 - 작성 필요
  const onAddPlaceBtnClick = (event) => {
    event.preventDefault();

    localStorage.setItem("courseName", courseName);
    console.log(localStorage.getItem("courseName"));

    localStorage.setItem("courseDescription", courseDescription);

    // 현재까지 추가된 장소 저장
    localStorage.setItem("placeItems", JSON.stringify(rows));

    showAddPlace();
  };

  const onDelBtnClick = (event, idx) => {
    event.preventDefault();

    setRows(
      rows.filter((row, i) => {
        return i != idx;
      })
    ); // 배열 재구축 후 다시 세팅
    // setRegisterCourseMap(
    //   <CourseMapWrapper
    //     setMarkers={setMarkers}
    //     rows={rows}
    //     latlng={latlng}
    //   />)
  };

  const showAddPlace = () => {
    window.location.href = "/addplace";
  };

  const onChangeName = (event) => {
    setCourseName(document.getElementById("courseName").value);
  };

  const onChangeDescription = (event) => {
    setCourseDescription(document.getElementById("courseDescription").value);
  };

  function createData(num, placeName, placeAddress, costTime) {
    return { num, placeName, placeAddress, costTime };
  }

  useEffect(() => {
    setCourseName(localStorage.getItem("courseName"));
    setCourseDescription(localStorage.getItem("courseDescription"));

    if (
      localStorage.getItem("placeItems") !== "" &&
      localStorage.getItem("placeItems") !== null
    ) {
      let place = {
        placeName: localStorage.getItem("AddPlaceName"),
        placeAddress: localStorage.getItem("AddPlaceAddress"),
        placeId: localStorage.getItem("AddPlaceId"),
        lat: localStorage.getItem("AddPlaceLat"),
        lng: localStorage.getItem("AddPlaceLng"),
        placeDescription: localStorage.getItem("AddPlaceDesc"),
        costTime: "",
      };
      console.log(place);

      const placeItems = [...JSON.parse(localStorage.getItem("placeItems"))];
      let isExists = false;
      placeItems.forEach((placeItem) => {
        if (placeItem.placeId === place.placeId) {
          isExists = true;
          return;
        }
      });

      let tmp = [];
      if (isExists) {
        tmp = [...placeItems];
      } else {
        tmp = [...placeItems, place];
      }
      setRows(tmp);
      setRegisterCourseMap(
        <CourseMapWrapper
          rows={tmp}
          markers={markers}
          setMarkers={setMarkers}
          latlng={latlng}
        />
      );
      localStorage.setItem("placeItems", "");
      console.log("setRows");
      console.log(tmp);
    }
  }, []);

  useEffect(() => {
    setRegisterCourseMap(
      <CourseMapWrapper
        rows={rows}
        markers={markers}
        setMarkers={setMarkers}
        latlng={latlng}
      />
    );
  }, [rows]);

  useEffect(() => {
    console.log(latlng);
    setRegisterCourseMap(
      <CourseMapWrapper
        markers={markers}
        setMarkers={setMarkers}
        rows={rows}
        latlng={latlng}
      />
    );
  }, [latlng]);

  return (
    <>
      <Container component="main" maxWidth="xs" style={{ marginTop: "3%" }}>
        {registerCourseMap}

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={onAddPlaceBtnClick}
                style={{
                  backgroundColor: "#55A9DD",
                  color: "white",
                  fontWeight: "bold",
                  width: "50vw",
                }}
              >
                장소 추가
              </Button>
            </Grid>
            {/* <input type="text" >장소1</input>
                <input type="text" >장소1 소요시간</input> */}

            <br />

            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                ref={courseListRef}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width={"15%"}>
                      순서
                    </TableCell>
                    <TableCell align="center" width={"45%"}>
                      장소명
                    </TableCell>
                    <TableCell align="center" style={{ display: "none" }}>
                      주소
                    </TableCell>
                    <TableCell align="center" width={"23%"}>
                      소요 <br /> 시간(분)
                    </TableCell>
                    <TableCell align="center">삭제</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        onClick={() => {
                          console.log(row);
                          setLatlng({
                            lat: row.lat,
                            lng: row.lng,
                            pName: row.placeName,
                            pDesc: row.placeDescription,
                          });
                          window.scrollTo(0, 0);
                        }}
                      >
                        {i + 1}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => {
                          console.log(row);
                          setLatlng({
                            lat: row.lat,
                            lng: row.lng,
                            pName: row.placeName,
                            pDesc: row.placeDescription,
                          });
                          window.scrollTo(0, 0);
                        }}
                      >
                        {row.placeName}
                      </TableCell>
                      <TableCell align="center" style={{ display: "none" }}>
                        {row.placeAddress}
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          onChange={(e) => {
                            let tmp = [...rows];
                            let num = e.currentTarget.value;
                            console.log(num);
                            if (num.indexOf("-") !== -1) {
                              num = num.slice(0, num.indexOf("-"));
                            }
                            if (num.indexOf(".") !== -1) {
                              num = num.slice(0, num.indexOf("."));
                            }
                            tmp[i].costTime = num;

                            console.log(tmp);
                            setRows(tmp);
                          }}
                          type="number"
                          align="center"
                          value={row.costTime}
                        ></TextField>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          type="button"
                          sx={{ p: "10px" }}
                          aria-label="search"
                          onClick={(e) => {
                            onDelBtnClick(e, i);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell style={{ display: "none" }}>
                        {row.id}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <br />

            <Grid item xs={12} style={{ marginTop: "15px" }}>
              <p
                style={{
                  marginLeft: "-70vw",
                  marginBottom: "5px",
                  marginTop: "0px",
                }}
              >
                코스 이름
              </p>
              <TextField
                autoComplete="courseName"
                name="courseName"
                variant="outlined"
                required
                id="courseName"
                onChange={onChangeName}
                value={courseName}
                style={{ width: "90vw" }}
                defaultValue="ㅤ"
              />
            </Grid>

            <br />

            <Grid item xs={12}>
              <p
                style={{
                  marginLeft: "-70vw",
                  marginBottom: "5px",
                  marginTop: "0px",
                }}
              >
                코스 설명
              </p>
              <TextField
                autoComplete="courseDescription"
                name="courseDescription"
                variant="outlined"
                required
                id="courseDescription"
                multiline
                rows={4}
                onChange={onChangeDescription}
                value={courseDescription}
                style={{ width: "90vw" }}
                defaultValue="ㅤ"
              />
            </Grid>
            <br />

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                sx={{ mt: 4, mb: 2 }}
                size="large"
                color="primary"
                onClick={handleSubmit}
                style={{ backgroundColor: "#55A9DD", color: "white", fontWeight: "bold" }}
              >
                제출하기
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

    </>
  );
}

export default RegisterCourse;
