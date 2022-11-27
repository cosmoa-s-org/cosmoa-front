import React from "react";
import { Container, Box, Typography, Button, Grid, Divider } from "@material-ui/core";
import styled from "@emotion/styled";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Mypage() {
    // const [titleData, setTitleData] = useState(user.title);


    const M = window.M

    let email = JSON.parse(localStorage.getItem("USER")).email
    let nickname = JSON.parse(localStorage.getItem("USER")).nickname
    let gender = JSON.parse(localStorage.getItem("USER")).gender
    let age = JSON.parse(localStorage.getItem("USER")).age

    const GridItem = styled(Grid)({
    })


    const Item = styled(Button)({
        borderRadius : "10px",
        border:"solid",
        // backgroundColor: "#55A9DD",
        // backgroundColor: "whitesmoke",
        color: "black",
        fontWeight: "bold",
        width:"100%",
        display:"flex",
        justifyContent:"left"
    })

    const Arrow = styled(ChevronRightIcon)({
        display:"flex",
        justifyContent:"right"
    })


    

    return (<>
        <Container  style={{ marginTop: "3%" }}>
        <Box style={{background:"whitesmoke"}}>
                <Typography style={{fontSize:"large"}}>환영합니다, {nickname}님 </Typography>
                <Typography style={{fontSize:"small"}}>{email}</Typography>
                </Box>
            <Box sx={{ marginTop: 8, alignItems: 'right', textAlign:"left"}} >
                <Divider />
                <Grid container spacing={2} style={{marginTop:"5%"}}>

                <GridItem item xs={12}>
                <Item href="/PostedPlace">등록한 장소 보기<Arrow /></Item>

                </GridItem>
                <GridItem item xs={12}>
                <Item href="/PostedCourse">등록한 코스 보기<Arrow /></Item>
                </GridItem>

                <GridItem item xs={12}>
                <Item href="/PlaceScrap">스크랩한 장소 보기<Arrow /></Item>
                </GridItem>
                <GridItem item xs={12}>
                <Item href="/CourseScrap">스크랩한 코스 보기<Arrow /></Item>
                </GridItem>
                <Divider />
                <GridItem item xs={12}>
                <Item href="/ChangeInfo">정보 수정하기<Arrow /></Item>
                </GridItem>
                </Grid>
            </Box>
        </Container>
    </>)
}

export default Mypage;