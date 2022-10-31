import React from "react";
import { Button, Box, Link } from "@material-ui/core";

function RegisterPlace(props) {

    const fileInput = React.useRef(null);
    
    const handleButtonClick = e => {
        fileInput.current.click();
    };

    const handleChange = e => {
        console.log(e.target.files[0]);
    };

    return(<>
        
        <br />
        <br />
        <br />

        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}><h1>Register Place Page</h1></Box>
        <img src="../images/test.jpg" ></img>

        <Button onClick={handleButtonClick} variant="contained">이미지 업로드</Button>
        <input type="file"
            ref={fileInput}
            onChange={handleChange}
            style={{ display: "none" }} />

            <br />
            <br />
        
        <Link href="/main">
            <Button variant="contained">메인으로</Button>
        </Link>
    </>)
}

export default RegisterPlace;
