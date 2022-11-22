import React from "react";
import { Grid, Link, Paper, Container, Box, Typography } from "@material-ui/core";
import { Stack, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { call } from "../../service/ApiService";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const PaperItem = styled(Paper)((({theme}) => ({
    backgroundColor: "lightsalmon",
    height:150,
    width: 150,
    lineHeight:"150px", 
    fontSize:24,
    margin:"0 auto",
    float:"left",
    color:"white",
    borderRadius:"20px",
    margin: "1vw",
    fontWeight:"700"
})))

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: "5px",
    fontWeight: "700"
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
            <br />
        <Paper style={{width:"100%", marginTop: "5px", backgroundColor:"#FFF89A", fontWeight:700}}>인기 코스</Paper>
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
            <PaperItem elevation={4}
            style={{}}>
                구성 인원
            </PaperItem>
        </Link>

        <Link href="/">
            <PaperItem elevation={4}>
                계절 및 기간
            </PaperItem>
        </Link>

        <br />

        <Link href="/">
            <PaperItem elevation={4}>
                지역 축제
            </PaperItem>
        </Link>

        <Link href="/">
            <PaperItem elevation={4}>
                추천 명소
            </PaperItem>
        </Link>

        </Grid>

        <br />
        
    </>)
}

export default SelectTheme;
