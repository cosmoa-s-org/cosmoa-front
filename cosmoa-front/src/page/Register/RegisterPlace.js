import { React, useState } from "react";
import { Button, Grid, Typography,Container, TextField } from "@material-ui/core";
import imgName from "../../images/test.png";
import MapWrapper from "../../map/MapWrapper";

function RegisterPlace() {
    const M = window.M;

    const [placeObject, setPlaceObject] = useState('');



    const SelectImgBtnClick = (event) => {
        M.media.picker({
            mode: "SINGLE",
            media: "PHOTO",
            path: "/media",
            column: 3,
            callback: function( status, result ) {
                console.log( status + ", " + JSON.stringify(result) );
            }
        });
        console.log("click");
        M.pop.alert("click");

        // 미리보기 이미지 변경 필요
    }

    const onBackHandler = (event) => {
        M.onBack( function(e) {
            // TODO : back event handle code here (android only)

        });
    }
    const handleSubmit = (event) => {
        M.onBack( function(e) {
            // TODO : back event handle code here (android only)

        });
    }


    return(<>
        {/* <Box sx={{ backgroundcolor: '#cfe8fc', height: '100vh' }}> */}
            <h1>Register Place Page</h1>
        {/* </Box> */}

            <div style={{margin:"0 auto"}}>
                <MapWrapper />
            </div>

        <img src={imgName} />

        <br />

        <Button variant="contained" onClick={SelectImgBtnClick}>사진 선택</Button> 

        <br />
        <br />
        <Container component="main" maxWidth="xs" style={{ marginTop: "3%" }}>
        <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextField
                            autoComplete="placename"
                            name="placename"
                            variant="outlined"
                            required
                            id="placename"
                            label="장소 이름"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            disabled
                            autoComplete="placeAddress"
                            name="placeAddress"
                            variant="outlined"
                            id="placeAddress"
                            label="주소"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            autoComplete="placeDescription"
                            name="placeDescription"
                            variant="outlined"
                            required
                            id="placeDescription"
                            label="장소 설명"
                        />
                    </Grid>

                    
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            sx={{ mt: 4, mb: 2 }}
                            size="large"
                            color="primary"
                            // onClick={submitHandler(event)}
                        >
                            제출하기
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
        <br />
        <br />
        
        <Button variant="contained" href="/main">메인으로</Button>

        <script>
            M.onBack( function(e) {
                // TODO : back event handle code here (android only)
            });
        </script>
    </>)
}

export default RegisterPlace;
