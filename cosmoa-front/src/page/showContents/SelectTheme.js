import React from "react";
import { Grid, Link, Paper } from "@material-ui/core";
import { Stack, styled } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function SelectTheme() {


    return(<>
        
        <h1>Select Theme Page</h1>
            <Item style={{backgroundColor:"lightgreen" }}>인기 코스</Item>
            <Link href="/courselist">
                <Item style={{backgroundColor:"yellow"}}>item1</Item>
            </Link>

            <Link href="/main">
                <Item style={{backgroundColor:"yellow"}}>item2</Item>
            </Link>

        <br/>

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
