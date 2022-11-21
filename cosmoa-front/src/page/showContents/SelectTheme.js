import React from "react";
import { Grid, Link, Paper, Container, Box, Typography } from "@material-ui/core";
import { Stack, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { call } from "../../service/ApiService";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';


const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: "5px"
}));

function SelectTheme() {

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
  

    const likeClick = (id) => {
        console.log(id);
        navigate(`/coursedetail/${id}`);
      }

    return(<>
        
        <Container maxWidth="sm">
        <Box><h1>Cosmoa</h1></Box>
        <Paper style={{width:"100%", marginTop: "5px", backgroundColor:"#FFF89A"}}>인기 코스</Paper>
          <Item style={{ backgroundColor: "#B1DCF8", width:"100%" }} onClick={() => {likeClick(likeCourse[0].id)}}>
            <AutoAwesomeIcon style={{color: "yellow"}} />{likeCourse.length > 0 ? likeCourse[0].name : ""}<AutoAwesomeIcon style={{color: "yellow"}} />
            </Item>
        <Item style={{ backgroundColor: "#B1DCF8", width:"100%" }} onClick={() => {likeClick(likeCourse[1].id)}}>
        <AutoAwesomeIcon style={{color: "yellow"}} />{likeCourse.length > 0 ? likeCourse[1].name : ""}<AutoAwesomeIcon style={{color: "yellow"}} />
        </Item>
      </Container>
        <br />
        <Grid  spacing={2} style={{display:"inline-block", padding:"5px"}}>

        <Link href="/courselist">
            <Paper elevation={4}
            style={{height:150, width: 150, lineHeight:"150px", fontSize:24, margin:"0 auto", float:"left", backgroundColor:"#B1DCF8" }}>
                구성 인원
            </Paper>
        </Link>

        <Link href="/">
            <Paper elevation={4}
            style={{height:150, width: 150, lineHeight:"150px", fontSize:24, margin:"0 auto", float:"left", backgroundColor:"#F8B4E3" }}>
                계절 및 기간
            </Paper>    
        </Link>

        <br />

        <Link href="/">
            <Paper elevation={4}
            style={{height:150, width: 150, lineHeight:"150px", fontSize:24, margin:"0 auto", float:"left", backgroundColor:"#B9F9E6" }}>
                지역 축제
            </Paper>
        </Link>

        <Link href="/">
            <Paper elevation={4}
            style={{height:150, width: 150, lineHeight:"150px", fontSize:24, margin:"0 auto", float:"left", backgroundColor:"#F5F8AD" }}>
                추천 명소
            </Paper>
        </Link>

        </Grid>

        <br />
        
    </>)
}

export default SelectTheme;
