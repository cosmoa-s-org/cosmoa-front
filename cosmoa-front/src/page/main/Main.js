import { AppBar, Box, Toolbar, Typography, Button, IconButton, Container, Link } from "@material-ui/core";
//import { MenuIcon } from "@material-ui/icons";
import * as React from 'react';

function Main() {
  return (<>
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}><h1>MainPage</h1></Box>
    </Container>

    <Link href="/registertype">
      <Paper variant="contained"
      sx={{
        // bgcolor: 
      }}>코스 및 장소 등록</Paper>
    </Link>

    
  </>)
}


export default Main;
