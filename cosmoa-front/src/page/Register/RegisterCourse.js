import React from "react";
import { Box, Link, Button, Container, Grid, TextField } from "@material-ui/core";
import MapWrapper from "../../map/MapWrapper";

function RegisterCourse(props) {

    // 제출 버튼 눌렀을때 이벤트 작성 필요
    const handleSubmit = (event) => {
        event.preventDefault();

    }

    return(<>
        <h1>Register Course Page</h1>

        {/* 나중에 CourseMaps.js로 변경 */}
        <MapWrapper /> 

        <Container component="main" maxWidth="xs" style={{ marginTop: "3%" }}>
        <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="courseName"
                        name="courseName"
                        variant="outlined"
                        required
                        id="courseName"
                        label="코스 이름"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        autoComplete="courseDescription"
                        name="courseDescription"
                        variant="outlined"
                        required
                        id="courseDescription"
                        label="코스 설명"
                    />
                </Grid>
            

                <br />

                <Grid item xs={12}>
                    <Link href="/addplace">
                        <Button variant="contained">장소 추가</Button>
                    </Link>
                </Grid>
                {/* <input type="text" >장소1</input>
                <input type="text" >장소1 소요시간</input> */}
                

                <br />
                <br />

                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        sx={{ mt: 4, mb: 2 }}
                        size="large"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        제출하기
                    </Button>
                </Grid>
            </Grid>
        </form>
        
        </Container>
        
        <br />
        
        <Button variant="contained" href="/main">메인으로</Button>
        
    </>)
}

export default RegisterCourse;
