import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from "@material-ui/core";
//import { MenuIcon } from "@material-ui/icons";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, styled } from "@mui/material";
import { useState, useEffect } from "react";
import { call } from "../../service/ApiService";
import travelImg_1 from "../../images/travel_1.png";
import travelImg_2 from "../../images/travel_2.png";
import { useTheme } from "@mui/material/styles";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import "../../font.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: "5px",
}));

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

function Main() {
  const header = { "Content-Type": "application/json" };
  const navigate = useNavigate();
  const [likeCourse, setLikeCourse] = useState([]);
  const [nickname, setNickname] = React.useState("");
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    const location = { lat: crd.latitude, lng: crd.longitude };
    localStorage.setItem("currentLocation", JSON.stringify(location));
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  React.useEffect(() => {
    setNickname(JSON.parse(localStorage.getItem("USER")).nickname);
  }, []);

  useEffect(() => {
    call("/course/hot", "GET", header, null).then((response) => {
      console.log(response);
      setLikeCourse(response.data);
    });

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const M = window.M;
  React.useEffect(() => {
    M.onBack(() => {
      if (window.confirm("앱을 종료하시겠습니까?")) M.sys.exit();
    });
  }, []);



  // carousel
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <Typography>{nickname}님 안녕하세요!</Typography>
    <br />
    <Grid container spacing={1}>

      <Grid item xs={12}>
      <Paper>
          {/* <img src={place} style={{ marginTop: "4%", width: "90vw" }}></img>
          <Typography>서울 롯데월드</Typography> */}
      <Box sx={{ flexGrow: 1}}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <Link href="/popularplace">
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        
      >
        {images.map((step, index) => (
          <div key={step.label} style={{display:"flex", justifyContent:"center"}}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  marginLeft:"5vw",
                  height: 255,
                  display: 'block',
                  overflow: 'hidden',
                }}
                src={step.imgPath}
                alt={step.label}
                style={{display:"flex", justifyContent:"center", margin:"2vw", overflow:"hidden"}}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      </Link>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            
          </Button>
        }
        />
      </Box>
      </Paper>
      </Grid>

        <br />
        <br />

        <Grid item xs={6}>
          <Link href="/registertype">
            <Paper
              variant="contained"
              style={{
                height: "auto",
                // lineHeight: "50px",
                fontSize: 20,
                width: "95%",
                margin: "0 auto",
                // backgroundColor: "#FFF89A",
                "border-radius": "15%",
              }}
            >
              <Typography
                style={{
                  verticalAlign: "middle",
                  height: "100%",
                  fontWeight: "600",
                  fontFamily: "roundExtraBold",
                  fontSize: "18px",
                  marginBottom: "10px",
                  paddingTop: "15px",
                }}
              >
                코스 & 장소 공유하기
              </Typography>
              <Typography
              style={{
                fontFamily: "roundRegular",
                fontSize: "13px",
              }}>
                나만의 장소를 등록한 후 코스에<br/> 추가해 등록해보세요!
              </Typography>
              <img
                src={travelImg_1}
                style={{ height: "25vw", width: "40vw" }}
              ></img>
            </Paper>
          </Link>
        </Grid>
        <br />

        <Grid item xs={6}>
          <Link href="/selecttheme">
            <Paper
              variant="contained"
              style={{
                height: "auto",
                // lineHeight: "150px",
                fontSize: 20,
                width: "95%",
                margin: "0 auto",
                // backgroundColor: "#FFF89A",
                "border-radius": "15%",
              }}
            >
              <Typography
                style={{
                  verticalAlign: "middle",
                  height: "100%",
                  fontWeight: "600",
                  fontFamily: "roundExtraBold",
                  fontSize: "20px",
                  marginBottom: "10px",
                  paddingTop: "15px",
                }}
              >
                코스 구경하기
              </Typography>
              <Typography
              style={{
                fontFamily: "roundRegular",
                fontSize: "13px",
              }}>
                다른 여행자들이 공유한 코스를 <br/>구경해보세요!
              </Typography>
              <img
                src={travelImg_2}
                style={{ height: "25vw", width: "40vw" }}
              ></img>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default Main;
