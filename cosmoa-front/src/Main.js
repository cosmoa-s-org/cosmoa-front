import { AppBar, Box, Toolbar, Typography, Button, IconButton  } from "@material-ui/core";
// import { MenuIcon } from "@material-ui/icons";
import * as React from 'react';

class Main extends React.Component {

  render() {
    return (
      <>
        <Box sx={{ flexGrow: 1 }} style={{backgroundColor:"yellow"}}>
          <AppBar position="static">
            <Toolbar>
              
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
            {/* <MenuIcon /> */}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
            </>
        )
    }
}

export default Main;
