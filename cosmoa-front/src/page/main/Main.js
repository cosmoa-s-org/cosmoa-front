import { Box, Button, Container, Link, Paper, Typography } from "@material-ui/core";
//import { MenuIcon } from "@material-ui/icons";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Stack, styled } from "@mui/material";
import { useState, useEffect } from "react";
import { call } from "../../service/ApiService";


const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: "5px"
}));

function Main() {
  const header = { "Content-Type": "application/json" };
  const navigate = useNavigate();
  const [likeCourse, setLikeCourse] = useState([]);

  useEffect(() => {
    call("/course/hot", "GET", header, null)
      .then((response) => {
        console.log(response);
        setLikeCourse(response.data);

      })
      }, []);

    const M = window.M;
    React.useEffect(() => {
      M.onBack(() => {
        if (window.confirm('앱을 종료하시겠습니까?')) M.sys.exit();
      })
    }, [])

    const likeClick = (id) => {
      console.log(id);
      navigate(`/coursedetail/${id}`);
    }

    return (<>

      <Container maxWidth="sm">
        <Box><h1>Cosmoa</h1></Box>
        <Typography style={{width:"100%", marginTop: "5px"}}>인기 코스</Typography>
          <Item style={{ backgroundColor: "yellow", width:"100%" }} onClick={() => {likeClick(likeCourse[0].id)}}>
            {likeCourse.length > 0 ? likeCourse[0].name : ""}
            </Item>
        <Item style={{ backgroundColor: "yellow", width:"100%" }} onClick={() => {likeClick(likeCourse[1].id)}}>
        {likeCourse.length > 0 ? likeCourse[1].name : ""}
        </Item>
      </Container>

      <br />
      <Link href="/registertype">
        <Paper variant="contained"
          style={{ height: 150, lineHeight: "150px", fontSize: 24, width: "90%", margin: "0 auto", backgroundColor: "#B1DCF8" }}
        // onClick={ onRegisterTypeClick }
        >
          나만의 코스 & 장소 공유하기
        </Paper>
      </Link>

      <br />

      <Link href="/selecttheme">
        <Paper variant="contained"
          style={{ height: 150, lineHeight: "150px", fontSize: 24, width: "90%", margin: "0 auto", backgroundColor: "#B1DCF8" }}>
          코스 & 장소 구경하기
        </Paper>
      </Link>

    </>)
  }


export default Main;
