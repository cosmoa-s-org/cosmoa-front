import React from "react";
import { Paper, Link, Container, Typography, Grid, styled } from "@material-ui/core";
import GroupIcon from '@mui/icons-material/Group';
import CloudIcon from '@mui/icons-material/Cloud';
import PlaceIcon from '@mui/icons-material/Place';
import RouteIcon from '@mui/icons-material/Route';
import MapIcon from '@mui/icons-material/Map';

const PaperItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#A6D7F7",
  height: 60,
  width: "60vw",
  lineHeight: "65px",
  fontSize: 24,
  // margin: "0 auto",
  float: "left",
  color: "white",
  borderRadius: "20px",
  margin: "2vw",
  marginLeft: "10vw",
  fontWeight: "700",
}));

const IconItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#F2DEBA",
  height: 60,
  width: 60,
  borderRadius: "35px",
  margin: "2vw",
  lineHeight: "88px",
}));

function RegisterType() {

  return (
    <>
    <Container style={{marginTop:"5%"}}>
      <br />
      <Typography variant="h5">등록할 코스 혹은 장소를 골라주세요.</Typography>
      <br />

      <br />
      </Container>
      <Grid container spacing={1} style={{ padding: "5px", marginLeft:8 }}>
        <Grid item xs={2}>
          <Link href="/registercourse">
            <IconItem elevation={4}>
              <MapIcon style={{color:"white", fontSize: 35,}}/>
            </IconItem>
          </Link>
        </Grid>
        <Grid item xs={10}>
          <Link href="/registercourse">
            <PaperItem elevation={4}>
            코스 등록
            </PaperItem>
          </Link>
        </Grid>

        <br />
        <br />
        <br />
        <br />
        <br />

        <Grid item xs={2}>
          <Link href="/registerplace">
            <IconItem elevation={4}>
              <PlaceIcon style={{color:"white", fontSize: 35,}}/>
            </IconItem>
          </Link>
        </Grid>
        <Grid item xs={10}>
          <Link href="/registerplace">
            <PaperItem elevation={4}>
            장소 등록
            </PaperItem>
          </Link>
        </Grid>

        <br />
      </Grid>
    </>
  );
}

export default RegisterType;
