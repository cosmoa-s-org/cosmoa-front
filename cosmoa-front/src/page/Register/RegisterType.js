import React from "react";
import { Paper, Link, Container, Typography } from "@material-ui/core";

function RegisterType() {

  return (
    <>
    <Container style={{marginTop:"5%"}}>
      <Typography variant="h5">등록할 코스 혹은 장소를 골라주세요.</Typography>
      <br />
      <Link href="/registercourse">
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
      </Link>

      <br />
      </Container>
    </>
  );
}

export default RegisterType;
