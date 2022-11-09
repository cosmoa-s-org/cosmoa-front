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
import React, { useState } from "react";
import MapWrapper from "../../map/MapWrapper";
import SearchIcon from "@mui/icons-material/Search";

function AddPlace(props) {
  // constructor(props) {
  //     super(props);
  //     this.state = {item : null};
  //     this.add = props.add;
  // }

  const [search, setSearch] = useState("");

  const onSearchBtnClick = function () {};

  const onSelcBtnClick = function () {
    this.add(this.state.item);
    this.setState({ item: "test" });
  };

  function createData(placeName, placeAddress) {
    return { placeName, placeAddress };
  }

  const rows = [
    createData("구미AA", "구미시 ㅁㅁ동 159"),
    createData("대구BB", "대구시 ㄴㄴ동 237"),
    createData("서울CC", "서울시 ㅇㅇ동 262"),
    createData("부산DD", "부산시 ㄹㄹ동 305"),
  ];

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
          placeholder="검색어 입력"
          inputProps={{ "aria-label": "search google maps" }}
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

      {/* <div style={{ clear: "both" }}>
        <Link href="/registercourse">
          <Button variant="contained">장소 선택</Button>
        </Link>
      </div> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                key={row.placeName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.placeName}
                </TableCell>
                <TableCell align="center">{row.placeAddress}</TableCell>
                <TableCell align="center">
                  <Link href="/registercourse">
                    <Button variant="outlined" onClick={onSelcBtnClick}>
                      장소 선택
                    </Button>
                  </Link>
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
