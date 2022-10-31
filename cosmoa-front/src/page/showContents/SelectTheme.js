import React from "react";
import { Link, Paper } from "@material-ui/core";

function SelectTheme() {
    return(<>
    <br />
    <br />
    <br />
        
        <h1>Select Theme Page</h1>

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

        <br />
        
    </>)
}

export default SelectTheme;
