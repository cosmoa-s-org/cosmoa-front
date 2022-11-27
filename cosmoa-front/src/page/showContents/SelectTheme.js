import React from "react";
import {
  Grid,
  Link,
  Paper,
  Container,
  Box,
  Typography,
} from "@material-ui/core";
import { Stack, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { call } from "../../service/ApiService";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import GroupIcon from '@mui/icons-material/Group';
import CloudIcon from '@mui/icons-material/Cloud';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttractionsIcon from '@mui/icons-material/Attractions';

const PaperItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#A6D7F7",
  height: 60,
  width: "66vw",
  lineHeight: "65px",
  fontSize: 24,
  // margin: "0 auto",
  float: "left",
  color: "white",
  borderRadius: "20px",
  margin: "2vw",
  marginLeft: "8.5vw",
  fontWeight: "700",
}));

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  marginTop: "5px",
  fontWeight: "700",
  height: 40,
  lineHeight: "30px",
  backgroundColor: "#FFF89A",
  color: "black",
}));

const IconItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#F2DEBA",
  height: 60,
  width: 60,
  borderRadius: "35px",
  margin: "2vw",
  lineHeight: "88px",
}));

function SelectTheme() {
  const header = { "Content-Type": "application/json" };
  const navigate = useNavigate();
  const [likeCourse, setLikeCourse] = useState([]);

  useEffect(() => {
    call("/course/hot", "GET", header, null).then((response) => {
      console.log(response);
      setLikeCourse(response.data);
    });
  }, []);

  const likeClick = (id) => {
    console.log(id);
    navigate(`/coursedetail/${id}`);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          style={{
            width: "100%",
            height: "40px",
            marginTop: "5px",
            marginBottom: "10px",
            // backgroundColor: "#FFF89A",
            fontWeight: 700,
            fontSize: "28px",
          }}
        >
          인기 코스
        </Paper>
        <Grid container spacing={2} style={{marginBottom:"15px"}}>
          <Grid item xs={6}>
            <Item
              onClick={() => {
                likeClick(likeCourse[0].id);
              }}
            >
              {/* <AutoAwesomeIcon style={{ color: "yellow" }} /> */}
              {likeCourse.length > 0 ? likeCourse[0].name : ""}
              {/* <AutoAwesomeIcon style={{ color: "yellow" }} /> */}
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item
              onClick={() => {
                likeClick(likeCourse[1].id);
              }}
            >
              {/* <AutoAwesomeIcon style={{ color: "yellow" }} /> */}
              {likeCourse.length > 0 ? likeCourse[1].name : ""}
              {/* <AutoAwesomeIcon style={{ color: "yellow" }} /> */}
            </Item>
          </Grid>
        </Grid>
      </Container>

      <hr />

      <br />

      <Grid container spacing={1} style={{ padding: "5px", marginLeft:8 }}>
        <Grid item xs={2}>
          <Link href="/courselist">
            <IconItem elevation={4}>
              <GroupIcon style={{color:"white", fontSize: 35,}}/>
            </IconItem>
          </Link>
        </Grid>
        <Grid item xs={10}>
          <Link href="/courselist">
            <PaperItem elevation={4}>구성 인원</PaperItem>
          </Link>
        </Grid>

        <br />

        <Grid item xs={2}>
          <Link href="/popularplace">
            <IconItem elevation={4}>
              <CloudIcon style={{color:"white", fontSize: 35,}}/>
            </IconItem>
          </Link>
        </Grid>
        <Grid item xs={10}>
          <Link href="/popularplace">
            <PaperItem elevation={4}>계절 및 기간</PaperItem>
          </Link>
        </Grid>

        <br /><Grid item xs={2}>
          <Link href="/popularplace">
            <IconItem elevation={4} style={{  lineHeight: "95px",}}>
              <AttractionsIcon style={{color:"white", fontSize: 45}}/>
            </IconItem>
          </Link>
        </Grid>
        <Grid item xs={10}>
          <Link href="/popularplace">
            <PaperItem elevation={4}>지역 축제</PaperItem>
          </Link>
        </Grid>

        <br /><Grid item xs={2}>
          <Link href="/popularplace">
            <IconItem elevation={4}>
              <AccountBalanceIcon style={{color:"white", fontSize: 35,}}/>
            </IconItem>
          </Link>
        </Grid>
        <Grid item xs={10}>
          <Link href="/popularplace">
            <PaperItem elevation={4}>추천 명소</PaperItem>
          </Link>
        </Grid>

        <br />
      </Grid>

      <br />
    </>
  );
}

export default SelectTheme;
