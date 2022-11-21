import { Box, Container, Select, Typography, InputLabel, MenuItem, FormControl, Divider, Tab, Tabs } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import MapWrapper from "../../map/MapWrapper";
import { call, CourseListSearch } from "../../service/ApiService";


// 탭
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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CourseList() {
    let navigate = useNavigate();
    const header = { "Content-Type" : "application/json" }
    const [courseList, setCourseList] = useState([]);
    const [pinPlace, setPinPlace] = useState({});
    const [courseList2, setCourseList2] = useState([]);

    const onPlacePined = (lat, lng) => {
        setPinPlace({ lat: lat, lng: lng });
        // document.getElementById("placeAddress").value = pinPlace.addr;
    }

    useEffect(() => {
        const data = new FormData();
        data.append('lat', pinPlace.lat)
        data.append('lng', pinPlace.lng)
        onhandlePost(data);
    },[pinPlace])

    const onhandlePost = async (data) => {
        CourseListSearch(data)
            .then((response) => {
                console.log(response);
                console.log('성공');
                console.log(data);
                console.log(response.data);
                setCourseList2(response);
            })
    }

    useEffect(() => {
        call("/course", "GET", header, null)
            .then((response) => {
                console.log(response);
                setCourseList(response.data);
                // setCourseList(courseList.name.concat(courseList.replyCount));
            })
    }, []);

    const [partner, setPartner] = useState('');
    const [value, setValue] = React.useState(0);

    const handleTab = (event, newValue) => {
        setValue(newValue);
    };


    const handleChange = (event) => {
        setPartner(event.target.value);
    };

    // setCourseList.name((courseList.name)+(courseList.replyCount));
    // setCourseList(
    //     courseList.concat({
    //         name: courseList.name + courseList.replyCount
    //     })
    // );
    const columns = [
        // { field: 'id', headerName: 'no', width: 10 },
        { field: 'name', headerName: '코스 이름', width: 180 },
        { field: 'replyCount', headerName: '댓글', width: 20 },
        { field: 'like', headerName: '추천', width: 20 },
        { field: 'nickname', headerName: '등록자', width: 100 },
    ];

    const goCourseDetail = (event) => {
        const data = `${event.row.id}`
        console.log(data);
        navigate(`/coursedetail/${event.row.id}`, {lat : 36.1461, lng : 128.3936});
    }

    return (<>
        <Typography variant="h4" style={{marginTop: "5%"}}> 여행 코스</Typography>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleTab} aria-label="basic tabs example" style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
                    <Tab label="리스트" {...a11yProps(0)} style={{ "flex-grow": 1, width: "50%" }} />
                    <Tab label="지도" {...a11yProps(1)} style={{ "flex-grow": 1, width: "50%" }} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Container maxWidth="xs" style={{ marginTop: "4%", textAlign: "left" }} t >
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">구성인원</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={partner}
                                label="구성인원"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>전체</MenuItem>
                                <MenuItem value={2}>혼자</MenuItem>
                                <MenuItem value={3}>가족</MenuItem>
                                <MenuItem value={4}>연인</MenuItem>
                                <MenuItem value={5}>친구</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Divider />

                    {/* 코스 리스트 */}
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={courseList}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onRowClick={goCourseDetail}
                        >
                            {/* <Link to={`/coursedetail/${courseList.id}`} ></Link> */}

                        </DataGrid>
                    </div>
                    </Container>

            </TabPanel>
            <TabPanel value={value} index={1}>
                <div style={{ margin: "0 auto" }}>
                    <MapWrapper onMarked={onPlacePined} />
                </div>

                <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={courseList2}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onRowClick={goCourseDetail}
                        >
                            {/* <Link to={`/coursedetail/${courseList.id}`} ></Link> */}

                        </DataGrid>
                    </div>


            </TabPanel>
        </Box>
    </>)
}

export default CourseList;