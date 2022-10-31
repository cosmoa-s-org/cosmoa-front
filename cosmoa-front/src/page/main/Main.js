import { Box, Container, Link, Paper } from "@material-ui/core";
//import { MenuIcon } from "@material-ui/icons";
import * as React from 'react';

function Main() {
  return (<>
    <br />
    <br />
    <br />
    
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}><h1>MainPage</h1></Box>
    </Container>

    <Link href="/registertype">
      <Paper variant="contained"
            style={{height:150, lineHeight:"150px", fontSize:24, width:"90%", margin:"0 auto", backgroundColor:"#B1DCF8"}}>
            코스 및 장소 등록
      </Paper>
    </Link>

    <br />

    <Link href="/selecttheme">
      <Paper variant="contained"
            style={{height:150, lineHeight:"150px", fontSize:24, width:"90%", margin:"0 auto", backgroundColor:"#B1DCF8"}}>
            코스 및 장소 조회
      </Paper>
    </Link>
    
  </>)
}


export default Main;
