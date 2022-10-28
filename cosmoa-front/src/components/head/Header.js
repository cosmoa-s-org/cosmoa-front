import React from "react";
import { AppBar, Box, Button, Grid, Toolbar, IconButton, Typography } from "@material-ui/core";
// import MenuIcon from '@mui/icons-material/Menu';

function Header() {

    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            Menu
            {/* <MenuIcon /> */}
          </IconButton>
          CosMoa
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Button color="inherit"><a href="/login"></a></Button>
        </Toolbar>
      </AppBar>
    </Box>
        <Grid item xs={12}>
        </Grid>
      </>
    );
  }

  export default Header;
