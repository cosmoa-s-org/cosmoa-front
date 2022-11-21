import React from "react";
import { Paper, Link, Container } from "@material-ui/core";

function RegisterType() {

  return (
    <>
    <Container>
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
