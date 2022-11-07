import { React, useState } from "react";
import { Button, Grid, Typography, Container, TextField, Box, Tab, Tabs, Table } from "@material-ui/core";
import imgName from "../../images/test.png";
import MapWrapper from "../../map/MapWrapper";
import PropTypes from 'prop-types';
import DaumPostcode from 'react-daum-postcode';

// 탭 추가
function TabPanel(props) {
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
                <Box sx={{ p: 3 }} >
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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function RegisterPlace() {
    const [value, setValue] = useState('');
    const [openPostcode, setOpenPostcode] = useState(false);
    const [address, setAddress] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handle = {
        // 주소 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `)
            setAddress(data.address);
            setOpenPostcode(false);
            console.log(address);
        },
    }

    const M = window.M;

    const [placeObject, setPlaceObject] = useState('');


    const SelectImgBtnClick = (event) => {
        M.media.picker({
            mode: "SINGLE",
            media: "PHOTO",
            // path: "/media",
            column: 3,
            callback: function (status, result) {
                console.log(status + ", " + JSON.stringify(result));
            }
        });
        console.log("click");
        M.pop.alert("click");

        // 미리보기 이미지 변경 필요
    }

    // 제출 버튼 눌렀을때 이벤트 작성 필요
    const handleSubmit = (event) => {
        event.preventDefault();

    }

    return (<>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="지도로 장소 추가" {...a11yProps(0)} />
                    <Tab label="주소로 장소 추가" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {/* 지도로 장소 등록 */}
                <h1>Register Place Page</h1>

                <div style={{ margin: "0 auto" }}>
                    <MapWrapper />
                </div>

                {/* 사진 선택시 변경되는 기능 작성 필요 */}
                <img src={imgName} />

                <br />

                <Button variant="contained" onClick={SelectImgBtnClick}>사진 선택</Button>

                <br />
                <br />
                <Container component="main" maxWidth="xs" style={{ marginTop: "3%" }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="placeName"
                                    name="placeName"
                                    variant="outlined"
                                    required
                                    id="placeName"
                                    label="장소 이름"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    autoComplete="placeAddress"
                                    name="placeAddress"
                                    variant="outlined"
                                    id="placeAddress"
                                    label="주소"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="placeDescription"
                                    name="placeDescription"
                                    variant="outlined"
                                    required
                                    id="placeDescription"
                                    label="장소 설명"
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    sx={{ mt: 4, mb: 2 }}
                                    size="large"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    제출하기
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
                <br />
                <br />

                <Button variant="contained" href="/main">메인으로</Button>

            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* 주소로 장소 등록 */}
                <Table>
                    <input type="text" id="address_kakao" name="address" value={address} readonly />
                </Table>
                <button onClick={handle.clickButton}>주소 검색</button>
                {openPostcode && 
                <DaumPostcode 
                    onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
                    />}
            </TabPanel>

        </Box>

        <script>
            M.onBack( function(e) {
                // TODO : back event handle code here (android only)
            });
        </script>
    </>)
}

export default RegisterPlace;
