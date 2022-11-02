import React from "react";
import { Container, Box, Avatar, Typography, Paper, Grid } from "@material-ui/core";
import PersonPinIcon from '@mui/icons-material/PersonPin';

function Mypage() {
    const M = window.M

    return (<>
        <Container component="main" maxWidth="xs" style={{ marginTop: "3%" }}>
            <Box sx={{ marginTop: 8, alignItems: 'center', display: 'flex' }} >
                <Avatar>
                    <PersonPinIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    마이 페이지
                </Typography>
                <br />
                <Grid item xs={12}>


                </Grid>
            </Box>
        </Container>

    </>)
}

export default Mypage;