import {
  Button,
  Grid,
  InputBase,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MapWrapper from "../../map/MapWrapper";
import SearchIcon from "@mui/icons-material/Search";
import { call } from "../../service/ApiService";

function AddPlace(props) {
  // constructor(props) {
  //     super(props);
  //     this.state = {item : null};
  //     this.add = props.add;
  // }

  const [rows, setRows] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState([]);
  const placeListRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    let placeList = placeListRef.current;

    const onSelcBtnClick = function (i) {
      let placeList = placeListRef.current;

      let placeName = placeList.rows[i].cells[0].innerText;
      let placeAddress = placeList.rows[i].cells[1].innerText;

      // console.log(placeName, placeAddress);

      localStorage.setItem("AddPlaceName", placeName);
      localStorage.setItem("AddPlaceAddress", placeAddress);

      console.log(localStorage.getItem("AddPlaceName"));

      // console.log(localStorage.getItem("CourseName"));
      window.location.href = "/RegisterCourse";
    };

    for (let i = 1; i < placeList.rows.length; i++) {
      placeList.rows[i].addEventListener("click", (e) => {
        // console.log(placeList.rows[i].cells[0].innerText);
        onSelcBtnClick(i);
      });
    }
  }, [rows]);


  // 작성중
  const onSearchBtnClick = (e) => {
    e.preventDefault();

    let url = "/place?search=";

    if (searchKeyword != "") url += searchKeyword;

    console.log(url);

    return call(url, "GET", null).then((response) => {
      console.log(response.data);
      setRows(response.data);
    });
  };

  return (
    <>
      <h1>Add Place Page</h1>

      {/* 지도 표시 */}
      <MapWrapper />

      {/* <Grid item xs={12} style={{margin:'auto'}}> */}
      <Paper
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          id="searchWord"
          placeholder="검색어 입력"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={(e) => {
            setSearchKeyword(e.currentTarget.value);
          }}
          value={searchKeyword}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={onSearchBtnClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* </Grid> */}

      <br />
      <br />

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          ref={placeListRef}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">장소명</TableCell>
              <TableCell align="center">주소</TableCell>
              <TableCell align="center">선택</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  <TextField style={{ display: "none" }}>{row.id}</TextField>
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">
                  {/* <Link href="/registercourse"> */}
                  <Button variant="outlined" type="button">
                    장소 선택
                  </Button>
                  {/* </Link> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AddPlace;
