import { React, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Container,
  TextField,
  Box,
  Tab,
  Tabs,
  Table,
} from "@material-ui/core";
import imgName from "../../images/test.png";
import MapWrapper from "../../map/MapWrapper";
import PropTypes from "prop-types";
import DaumPostcode from "react-daum-postcode";
import { call, registerPlace } from "../../service/ApiService";

const M = window.M;

const coordsApadter = ({ latitude, longitude }) => {
  return {
    lat: Number(latitude),
    lng: Number(longitude),
  };
};

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.userAgent.indexOf("Android") === -1) {
      console.log(navigator.userAgent);
      resolve(coordsApadter({ latitude: 36.1461, longitude: 128.3936 }));
    }

    M.plugin("location").current({
      timeout: 10000,
      maximumAge: 1,
      callback: function ({ status, message, coords }) {
        if (status === "SUCCESS" && coords) {
          // 성공
          resolve(coordsApadter(coords));
        } else {
          // 실패
          reject(new Error("Getting GPS coords is failed"));
        }
      },
    });
  });
};

// 탭 추가
function TabPanel(props) {
  const imgPath = "";
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function setImage(path) {
  var img = document.getElementById("placeImg");
  img.src = "/" + path;
  img.style.visibility = "visible";
  console.log(img.src);
}

function RegisterPlace() {
  const [value, setValue] = useState(0);
  const [openPostcode, setOpenPostcode] = useState(false);
  const [address, setAddress] = useState("");
  let userId = JSON.parse(localStorage.getItem("USER")).id;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handle = {
    // 주소 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `);

      let addr = "";
      if (data.address.indexOf("(") !== -1) {
        addr = data.address.slice(0, data.address.indexOf("("));
      } else {
        addr = data.address;
      }
      setAddress(addr);
      // 위,경도 호출
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: addr }).then((response) => {
        onPlacePined(
          response.results[0].geometry.location.lat(),
          response.results[0].geometry.location.lng(),
          addr
        );
      });
      setOpenPostcode(false);
    },
  };

  const [path, setPath] = useState("");
  const [pinPlace, setPinPlace] = useState({});

  const onPlacePined = (lat, lng, addr) => {
    setPinPlace({ lat: lat, lng: lng, addr: addr });
  };

  const SelectImgBtnClick = (event) => {
    // const path = "";
    M.media.picker({
      mode: "SINGLE",
      media: "PHOTO",
      column: 3,
      callback: function (status, result) {
        setPath(result.path);
        console.log(status + ", " + JSON.stringify(result));
        console.log(path);
        if (status === "SUCCESS") {
          M.file.read({
            path: result.path,
            encoding: "BASE64",
            indicator: true,
            callback: function (status, result) {
              console.log(status + JSON.stringify(result));

              var img = document.getElementById("placeImg");

              //mime-type은 별도로 스크립트에서 지정 필요
              img.src = "data:image/png;base64," + result.data;

              img.style.width = "250px";
              img.style.height = "250px";
            },
          });
        }
      },
    });
    console.log("click");

    // 미리보기 이미지 변경
    setImage(path);
  };

  const onhandlePost = async (data) => {
    console.log(data);
    registerPlace(data).then((response) => {
      console.log(response);
      console.log("성공");
      console.log(data);
    });
  };

  // 제출 버튼 눌렀을때 이벤트
  const handleSubmit = (event) => {
    if(pinPlace.addr==null||pinPlace.addr==undefined){
      M.pop.alert("주소를 설정하세요!");
      return;
    }
    var img = document.getElementById("placeImg");

    event.preventDefault();

    const data = new FormData(event.currentTarget);
    data.append("userId", userId);
    data.append("name", data.get("placeName"));
    data.append("address", pinPlace.addr);
    data.append("lat", pinPlace.lat);
    data.append("lng", pinPlace.lng);
    data.append("description", data.get("placeDescription"));
    if (img.width !== 0) {
      let imgFile = new File([img.src], "img", { type: "image/png" });
      data.append("img", imgFile);
      console.log(imgFile);
    }

    console.log(data);
    onhandlePost(data);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            // style={{ backgroundColor:"red" }}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Tab
              label="지도로 장소 추가"
              {...a11yProps(0)}
              style={{ "flex-grow": 1, width: "50%" }}
            />
            <Tab
              label="주소로 장소 추가"
              {...a11yProps(1)}
              style={{ "flex-grow": 1, width: "50%" }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {/* 지도로 장소 등록 */}

          <div style={{ margin: "0 auto" }}>
            <MapWrapper onMarked={onPlacePined} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* 주소로 장소 등록 */}
          <div marginTop="10px">
            <Table>
              <input
                type="text"
                id="address_kakao"
                name="address"
                value={address}
                readonly
                placeholder="주소"
                style={{ display: "none" }}
              />
              <Button
                sx={{ mt: 4, mb: 2 }}
                size="large"
                style={{
                  backgroundColor: "#55A9DD",
                  width: "50vw",
                  color: "white",
                  fontWeight: "bold",
                }}
                onClick={handle.clickButton}
              >
                주소 검색
              </Button>
            </Table>
            {openPostcode && (
              <DaumPostcode
                onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
              />
            )}
          </div>
        </TabPanel>

        <img
          id="placeImg"
          style={{ visibility: "hidden", marginTop: "-15px" }}
          src=""
        />
        <br />

        <Button
          type="submit"
          sx={{ mt: 4, mb: 2 }}
          size="large"
          style={{
            backgroundColor: "#55A9DD",
            width: "50vw",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={SelectImgBtnClick}
        >
          사진 선택
        </Button>

        {/* <br /> */}
        <br />
        <Container component="main" maxWidth="xs" style={{ marginTop: "3%" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <p
                  style={{
                    marginLeft: "-70vw",
                    marginBottom: "5px",
                    marginTop: "0px",
                  }}
                >
                  장소 이름
                </p>
                <TextField
                  autoComplete="placeName"
                  name="placeName"
                  variant="outlined"
                  required
                  id="placeName"
                  style={{ width: "90vw" }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  disabled
                  autoComplete="placeAddress"
                  name="placeAddress"
                  variant="outlined"
                  id="placeAddress"
                  placeholder="주소"
                  defaultValue=""
                  value={pinPlace.addr}
                  style={{ width: "90vw" }}
                />
              </Grid>

              <Grid item xs={12}>
                <p
                  style={{
                    marginLeft: "-70vw",
                    marginBottom: "5px",
                    marginTop: "0px",
                  }}
                >
                  장소 설명
                </p>
                <TextField
                  autoComplete="placeDescription"
                  name="placeDescription"
                  variant="outlined"
                  required
                  id="placeDescription"
                  multiline
                  rows={4}
                  style={{ width: "90vw" }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  sx={{ mt: 4, mb: 2 }}
                  size="large"
                  style={{
                    backgroundColor: "#55A9DD",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  제출하기
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>

        {/* <br />
                <br /> */}

        {/* <Button variant="contained" href="/main">
                    메인으로
                </Button> */}
      </Box>

      <script>
        M.onBack( function(e){" "}
        {
          // TODO : back event handle code here (android only)
        }
        );
      </script>
    </>
  );
}

export default RegisterPlace;
