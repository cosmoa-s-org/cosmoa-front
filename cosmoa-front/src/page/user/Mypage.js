import React from "react";
import { Container, Box, Typography, Button, Grid, Divider } from "@material-ui/core";
import styled from "@emotion/styled";

function Mypage() {
    // const [titleData, setTitleData] = useState(user.title);


    const M = window.M

    let email = JSON.parse(localStorage.getItem("USER")).email
    let nickname = JSON.parse(localStorage.getItem("USER")).nickname
    let gender = JSON.parse(localStorage.getItem("USER")).gender
    let age = JSON.parse(localStorage.getItem("USER")).age

    const GridItem = styled(Grid)
    `
    background-color : "yellow";
    border : "solid";
    borderColor : "blue';
    `


    const Item = styled(Button)
    `
    // background-color : red;
    borderRadius : "20px";
    border : 1px "solid";
    borderColor : "blue";
    `


    

    return (<>
        <Container  style={{ marginTop: "3%" }}>
            <Box sx={{ marginTop: 8, alignItems: 'center'}} >
                <Typography style={{fontSize:"large"}}>환영합니다, {nickname}님 </Typography>
                <Typography style={{fontSize:"small"}}>{email}</Typography>
                <Divider />
                <Grid container spacing={2} style={{marginTop:"5%"}}>
                <GridItem item xs={6}>
                <Item href="/PostedPlace">내가 등록한 장소</Item>
                </GridItem>
                <GridItem item xs={6}>
                <Item href="/PostedCourse">내가 등록한 코스</Item>
                </GridItem>
                <GridItem item xs={6}>
                <Item href="/PlaceScrap">스크랩한 장소</Item>
                </GridItem>
                <GridItem item xs={6}>
                <Item href="/CourseScrap">스크랩한 코스</Item>
                </GridItem>
                <GridItem item xs={12}>
                <Item href="/ChangeInfo">정보 수정하기</Item>
                </GridItem>
                </Grid>
            </Box>
        </Container>
    </>)
}

export default Mypage;