import React from "react";
import { Box, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

function Header() {
    return (
      <>
        <Grid container justifyContent="flex-end">
          <Grid item>
            홍길동님 내정보 /
            {/* <Link href="/login">로그아웃</Link> */}
          </Grid>
          <i class="fa-solid fa-bars"></i>
        </Grid>
        <Grid item xs={12}>
            <Box bgcolor="primary.main"><a href="/login">Login</a></Box>
        </Grid>
      </>
    );
  }

  export default Header;
