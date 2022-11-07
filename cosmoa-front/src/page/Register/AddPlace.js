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
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onButtonClick = function () {
    this.add(this.state.item);
    this.setState({ item: "test" });
  };

  function createData(placeName, placeAddress) {
    return { placeName, placeAddress };
  }
  
  const rows = [
    createData('구미AA', '구미시 ㅁㅁ동 159'),
    createData('대구BB', '대구시 ㄴㄴ동 237'),
    createData('서울CC', '서울시 ㅇㅇ동 262'),
    createData('부산DD', '부산시 ㄹㄹ동 305'),
  ];

  return (
    <>
      <h1>Add Place Page</h1>

      {/* 지도 표시 */}
      <MapWrapper />

      {/* <input type="text" value={search} onChange={onChange} /> */}

      {/* <Grid item xs={12} style={{margin:'auto'}}> */}
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="검색어 입력"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {/* <div style={{clear: 'both'}}>
                <TextField
                    autoComplete='searchText'
                    name='searchText'
                    variant='outlined'
                    id='searchText'
                    label='검색어 입력'
                    style={{float: 'center'}}
                />
            </div> */}

      {/* </Grid> */}

      {/* <Button variant='contained' style={{float: 'left', margin:'auto'}}>장소 찾기</Button> */}

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
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.placeName}
              </TableCell>
              <TableCell align="center">{row.placeAddress}</TableCell>
              <TableCell align="center">
                <Link href="/registercourse">
                  <Button variant="outlined">장소 선택</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


      {/* <section class="place_search_result">
        <div class="table-wrapper">
          <table class="place_table">
            <tbody>
              <tr>
                <th>장소명</th>
                <th>주소</th>
                <th>선택</th>
              </tr>
              <tr></tr>
              <tr>
                <td class="place_name">
                  <a href="#none" onclick="makeOverlay(155);">
                    구미AA카페
                  </a>
                </td>
                <td>경상북도 구미시 거의동 AA</td>
                <td>
                  <Link href="/registercourse">
                    <Button variant="outlined">장소 선택</Button>
                  </Link>
                </td>
              </tr>
              <tr></tr>
              <tr>
                <td class="place_name">
                  <a href="#none" onclick="makeOverlay(276);">
                    구미BB마트
                  </a>
                </td>
                <td>경상북도 구미시 옥계동 BB</td>
                <td>
                  <Link href="/registercourse">
                    <Button variant="outlined">장소 선택</Button>
                  </Link>
                </td>
              </tr>
              <tr></tr>
              <tr>
                <td class="place_name">
                  <a href="#none" onclick="makeOverlay(439);">
                    구미CC고기
                  </a>
                </td>
                <td>경상북도 구미시 진평동 CC</td>
                <td>
                  <Link href="/registercourse">
                    <Button variant="outlined">장소 선택</Button>
                  </Link>
                </td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>

        <div class="pager">
          <div class="pageinate">
            <div class="cont">
              <a href="#none" class="arr prev off">
                이전페이지
              </a>
              <a href="#none" class="active">
                1
              </a>
              <a href="javascript:renderSearchResult(2)">2</a>
              <a href="javascript:renderSearchResult(3)">3</a>
              <a href="javascript:renderSearchResult(2)" class="arr next">
                다음페이지
              </a>{" "}
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default AddPlace;
