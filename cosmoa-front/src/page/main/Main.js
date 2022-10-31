import { Box, Container, Link, Paper } from "@material-ui/core";
//import { MenuIcon } from "@material-ui/icons";
import * as React from 'react';

function Main() {
  return (<>
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}><h1>MainPage</h1></Box>
    </Container>

    <Link href="/registertype">
      <Paper variant="contained"
        style={{height:100, lineHeight:"100px", fontSize:24, width:"85%", margin:"0 auto"}}>
        코스 및 장소 등록
      </Paper>
    </Link>

    <Link href="/selectthme">
      <Paper variant="contained"
        style={{height:100, lineHeight:"100px", fontSize:24, width:"85%", margin:"0 auto"}}>
        코스 및 장소 조회
      </Paper>
    </Link>
    
  </>)
}


export default Main;
