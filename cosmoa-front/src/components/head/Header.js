import * as React from 'react';
import { Link, styled, useTheme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PortraitIcon from '@mui/icons-material/Portrait';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import BookmarkAddedTwoToneIcon from '@mui/icons-material/BookmarkAddedTwoTone';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import HomeIcon from '@mui/icons-material/Home';
// import ListItemButton from '@material-ui/core';
import { Button, Box, Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import BookmarkAddedTwoTone from '@mui/icons-material/BookmarkAddedTwoTone';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import TextLogo from '../../images/cosmoa_textLogo.png';


// 사이드 Nav바
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const MuiAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'center'
}));

function Header() {
  const M = window.M;
  const location = useLocation();



  React.useEffect(() => {
    // 안드로이드 이외의 운영체제에서 접속시 onBack 설정하지 않고 return
    if (navigator.userAgent.indexOf('Android') === -1) return;

    M.onBack(() => {
      console.log(location.pathname)
      if(location.pathname==="/main") {}
      else if(location.pathname==="/") {}
      // else if(location.pathname.slice(0,13)=="/courselist") {}
      else {
        navigate(-1)
        localStorage.setItem("latlng", JSON.stringify({}))
      }
    });

  },[])
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [nickname, setNickname] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("USER")) {
      window.location.href = "/signin";
    }
    setNickname(JSON.parse(localStorage.getItem("USER")).nickname);
  }, []);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logoutClicked = (event) => {
    localStorage.setItem("USER", "");
    M.pop.alert("로그아웃 되었습니다.");
    navigate("/signin");
  }

  return (<>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={0}>
        <div style={{backgroundColor: "#55A9DD", width:"100vw", height:"15px"}}></div>
        <Toolbar style={{backgroundColor: "white", color: "#53A5D8", elevation: 0}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography align="center" style={{width:"100%"}}>
            <a href="/main" >
              <img href="/main" src={TextLogo} style={{marginTop:"0%", width:"35vw"}}></img>
            </a>
          </Typography>
          <Link style={{marginLeft: "auto"}} href="/Mypage">
          <Button style={{"margin-right":"-4vw"}}><EmojiEmotionsIcon style={{color:"skyblue"}} /></Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
          <Typography align="center" style={{width:"100%"}}>{nickname}님</Typography>
          </ListItem>
          <Divider />
        <Link href="/Mypage">
          <ListItem disablePadding>
            <Button>
              <ListItemIcon><PortraitIcon /></ListItemIcon>
              <ListItemText>내 정보</ListItemText>
            </Button>
          </ListItem>
          </Link>
          <Divider />
        </List>        
        <List>
        <Link href="/RegisterType">
          <ListItem disablePadding>
            <Button>
              <ListItemIcon><PostAddIcon /></ListItemIcon>
              <ListItemText>코스 & 장소 등록</ListItemText>
            </Button>
          </ListItem>
          </Link>
          <Link href="/SelectTheme">
          <ListItem disablePadding>
            <Button>
              <ListItemIcon><DynamicFeedIcon /></ListItemIcon>
              <ListItemText>코스 & 장소 조회</ListItemText>
            </Button>
          </ListItem>
          </Link>
        </List>
        <Divider />
        <Button onClick={logoutClicked}>로그아웃</Button>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

      </Main>
    </Box>
    </>);
}

export default Header;