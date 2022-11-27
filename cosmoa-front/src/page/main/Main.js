import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from "@material-ui/core";
//import { MenuIcon } from "@material-ui/icons";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, styled } from "@mui/material";
import { useState, useEffect } from "react";
import { call } from "../../service/ApiService";
import logo from "../../images/cosmoa_icon.png";
import place from "../../images/lotteworld.png";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: "5px",
}));

function Main() {
  const header = { "Content-Type": "application/json" };
  const navigate = useNavigate();
  const [likeCourse, setLikeCourse] = useState([]);
  const [nickname, setNickname] = React.useState("");

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    const location = { lat: crd.latitude, lng: crd.longitude };
    localStorage.setItem("currentLocation", JSON.stringify(location));
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  React.useEffect(() => {
    setNickname(JSON.parse(localStorage.getItem("USER")).nickname);
  }, []);

  useEffect(() => {
    call("/course/hot", "GET", header, null).then((response) => {
      console.log(response);
      setLikeCourse(response.data);
    });

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const M = window.M;
  React.useEffect(() => {
    M.onBack(() => {
      if (window.confirm("앱을 종료하시겠습니까?")) M.sys.exit();
    });
  }, []);

  const likeClick = (id) => {
    console.log(id);
    navigate(`/coursedetail/${id}`);
  };

  return (
    <>
      <Typography>{nickname}님 안녕하세요!</Typography>

      <Link href="/popularplace">
        <Container maxWidth="sm">
          <img src={place} style={{ marginTop: "4%", width: "90vw" }}></img>
          <Typography>서울 롯데월드</Typography>
        </Container>
      </Link>

      <br />
      <br />

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Link href="/registertype">
            <Paper
              variant="contained"
              style={{
                height: 150,
                // lineHeight: "50px",
                fontSize: 20,
                width: "95%",
                margin: "0 auto",
                // backgroundColor: "#FFF89A",
                "border-radius": "15%",
              }}
            >
              <Typography
                style={{
                  verticalAlign: "middle",
                  height: "100%",
                }}
              >
                나만의 코스 & 장소 <br /> 공유하기
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <br />

        <Grid item xs={6}>
          <Link href="/selecttheme">
            <Paper
              variant="contained"
              style={{
                height: 150,
                // lineHeight: "150px",
                fontSize: 20,
                width: "95%",
                margin: "0 auto",
                // backgroundColor: "#FFF89A",
                "border-radius": "15%",
              }}
            >
              <Typography style={{ verticalAlign: "middle" }}>
                코스 & 장소 <br /> 구경하기
              </Typography>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default Main;
