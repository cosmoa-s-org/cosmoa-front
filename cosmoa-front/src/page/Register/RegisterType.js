import React from "react";
import { Paper, Link, Container, Typography, Grid, styled } from "@material-ui/core";
import GroupIcon from '@mui/icons-material/Group';
import CloudIcon from '@mui/icons-material/Cloud';

const PaperItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#A6D7F7",
  height: 60,
  width: "55vw",
  lineHeight: "65px",
  fontSize: 24,
  // margin: "0 auto",
  float: "left",
  color: "white",
  borderRadius: "20px",
  margin: "1vw",
  marginLeft: "10vw",
  fontWeight: "700",
}));

const IconItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#F2DEBA",
  height: 60,
  width: 60,
  borderRadius: "35px",
  margin: "1vw",
  lineHeight: "110px",
}));

function RegisterType() {

  return (
    <>
    <Container style={{marginTop:"5%"}}>
      <Typography variant="h5">등록할 코스 혹은 장소를 골라주세요.</Typography>
      <br />
      {/* <Link href="/registercourse">
        <Paper
          elevation={4}
          style={{
            height: 150,
            lineHeight: "150px",
            fontSize: 24,
            width: "90%",
            margin: "0 auto",
          }}
        >
          코스 등록
        </Paper>
      </Link>

      <br />

      <Link href="/registerplace">
        <Paper
          elevation={4}
          style={{
            height: 150,
            lineHeight: "150px",
            fontSize: 24,
            width: "90%",
            margin: "0 auto",
          }}
        >
          장소 등록
        </Paper>
      </Link> */}

      <br />
      </Container>
      <Grid container spacing={1} style={{ padding: "5px", marginLeft:8 }}>
        <Grid item xs={2}>
          <Link href="/registercourse">
            <IconItem elevation={4}>
              <GroupIcon style={{color:"white", fontSize: 40,}}/>
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

        <Grid item xs={2}>
          <Link href="/registerplace">
            <IconItem elevation={4}>
              <CloudIcon style={{color:"white", fontSize: 40,}}/>
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
