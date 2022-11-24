import { Typography } from "@material-ui/core";
import React from "react";


function Footer() {
    // 화면 아래 고정적으로 출력할 footer (copyright())
    return (<>
    <div style={{position:"fixed", bottom:0, width:"100vw", backgroundColor:"white", color:"black"}}>
        <Typography>금오공과대학교 COSMOA</Typography>
    </div>
    </>)
}

export default Footer;
