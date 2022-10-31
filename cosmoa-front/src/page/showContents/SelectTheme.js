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
            style={{height:150, lineHeight:"150px", fontSize:24, width:"40%", margin:"0 auto", float:"left" }}>
                구성 인원
            </Paper>
        </Link>

        <Link href="/">
            <Paper elevation={4}
            style={{height:150, lineHeight:"150px", fontSize:24, width:"40%", margin:"0 auto", float:"left" }}>
                계절 및 기간
            </Paper>
        </Link>

        <br />

        <Link href="/">
            <Paper elevation={4}
            style={{height:150, lineHeight:"150px", fontSize:24, width:"40%", margin:"0 auto", float:"left" }}>
                지역 축제
            </Paper>
        </Link>

        <Link href="/">
            <Paper elevation={4}
            style={{height:150, lineHeight:"150px", fontSize:24, width:"40%", margin:"0 auto", float:"left" }}>
                추천 명소
            </Paper>
        </Link>

        <br />
    </>)
}

export default SelectTheme;
