import { AppBar, Box, Toolbar, Typography, Button, IconButton, Container, Link } from "@material-ui/core";
import { icon } from "@mui/icons-material"
//import { MenuIcon } from "@material-ui/icons";
import * as React from 'react';

function Main() {
  return (<>
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}><h1>MainPage</h1></Box>
    </Container>

    <Link href="/registerplace">
      <Button variant="contained">장소 등록</Button>
    </Link>

    
  </>)
}


export default Main;
