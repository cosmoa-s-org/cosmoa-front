import {
  Button,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { AddPlaceMapWrapper } from "../../map/MapWrapper";
import SearchIcon from "@mui/icons-material/Search";
import { call } from "../../service/ApiService";
import { useNavigate } from "react-router-dom";

function AddPlace(props) {
  var map, markerOptions, infowindow, contentString;

  const header = { "Content-Type": "application/json" };

  const [rows, setRows] = useState([]);
  const [latlng, setLatlng] = useState({});
  const [searchKeyword, setSearchKeyword] = useState([]);
  const placeListRef = useRef(null);
  const [data, setData] = useState([]);
  const [addPlaceMap, setAddPlaceMap] = useState("");
  const [markers, setMarkers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let placeList = placeListRef.current;

    for (let i = 1; i < placeList.rows.length; i++) {
      placeList.rows[i].cells[0].addEventListener("click", (e) => {
        // console.log(placeList.rows[i].cells[0].innerText);
        //makeOverlay(placeList.rows[i].cells[3].innerText);
      });
    }

    for (let i = 1; i < placeList.rows.length; i++) {
      placeList.rows[i].cells[2].addEventListener("click", (e) => {
        // console.log(placeList.rows[i].cells[0].innerText);
        onSelcBtnClick(i);
      });
    }
    setMarkers([]);
    setAddPlaceMap(
      <AddPlaceMapWrapper
        rows={rows}
        markers={markers}
        setMarkers={setMarkers}
        latlng={latlng}
      />
    );
    // console.log(rows);
  }, [rows]);

  useEffect(() => {
    // console.log(latlng);
    setAddPlaceMap(
      <AddPlaceMapWrapper
        rows={rows}
        markers={markers}
        setMarkers={setMarkers}
        latlng={latlng}
      />
    );
    console.log(rows);
  }, [latlng]);

  const onSelcBtnClick = function (i) {
    let placeList = placeListRef.current;

    let placeName = placeList.rows[i].cells[0].innerText;
    let placeAddress = placeList.rows[i].cells[1].innerText;
    let placeId = placeList.rows[i].cells[3].innerText;
    let placeLat = placeList.rows[i].cells[4].innerText;
    let placeLng = placeList.rows[i].cells[5].innerText;
    let placeDescription = placeList.rows[i].cells[6].innerText;

    // console.log(placeName, placeAddress);

    localStorage.setItem("AddPlaceName", placeName);
    localStorage.setItem("AddPlaceAddress", placeAddress);
    localStorage.setItem("AddPlaceId", placeId);
    localStorage.setItem("AddPlaceLat", placeLat);
    localStorage.setItem("AddPlaceLng", placeLng);
    localStorage.setItem("AddPlaceDesc", placeDescription);

    // console.log(localStorage.getItem("AddPlaceId"));

    // console.log(localStorage.getItem("CourseName"));
    window.location.href = "/RegisterCourse";
    // navigate("/registercourse", {state: {lat:row.lat,lng:row.lng}});
  };

  const closeOverlay = function () {
    if (infowindow != null) infowindow.close();
  };

  const onSearchBtnClick = (e) => {
    e.preventDefault();

    let url = "/place?search=";

    if (searchKeyword != "") url += searchKeyword;

    console.log(url);

    return call(url, "GET", header, null).then((response) => {
      console.log(response.data);
      setRows(response.data);
    });
  };

  const onPlaceClick = (row) => {
    // localStorage.setItem("AddPlaceDesc", JSON.stringify(row.description));

    setLatlng({ lat: row.lat, lng: row.lng, pName : row.name, pDesc : row.description });
  }

  return (
    <>
      <h1>Add Place Page</h1>

      {/* 지도 표시 */}
      {addPlaceMap}

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
              <TableCell align="center" width={"25%"}>
                장소명
              </TableCell>
              <TableCell align="center">주소</TableCell>
              <TableCell align="center">선택</TableCell>
              <TableCell style={{ display: "none" }}>id</TableCell>
              <TableCell style={{ display: "none" }}>lat</TableCell>
              <TableCell style={{ display: "none" }}>lng</TableCell>
              <TableCell style={{ display: "none" }}>desc</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  onClick={() => {
                    onPlaceClick(row)
                    window.scrollTo(0,0);
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    type="button"
                    onClick={onSelcBtnClick}
                  >
                    장소<br />선택
                  </Button>
                </TableCell>
                <TableCell style={{ display: "none" }}>{row.id}</TableCell>
                <TableCell style={{ display: "none" }}>{row.lat}</TableCell>
                <TableCell style={{ display: "none" }}>{row.lng}</TableCell>
                <TableCell style={{ display: "none" }}>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AddPlace;
