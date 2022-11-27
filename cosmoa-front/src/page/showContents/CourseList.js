import { Box, Container, Select, Typography, InputLabel, MenuItem, FormControl, Divider, Tab, Tabs, Grid, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import MapWrapper, { CoursePreviewMapWrapper } from "../../map/MapWrapper";
import { call, CourseListSearch } from "../../service/ApiService";
import ReadMoreIcon from "../../images/ReadMore3.png";
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


// 탭-----------------------------------------------------------------------
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

// 탭 끝-----------------------------------------------------------------------

function CourseList() {
    let navigate = useNavigate();
    const header = { "Content-Type" : "application/json" }
    const [courseList, setCourseList] = useState([]);
    const [pinPlace, setPinPlace] = useState({});
    const [courseList2, setCourseList2] = useState([]);
    const [listGrid, setListGrid] = useState(<></>);
    const [partner, setPartner] = useState('');
    const [value, setValue] = useState(0);

    const onPlacePined = (lat, lng) => {
        setPinPlace({ lat: lat, lng: lng });
    }

    const handleTab = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange = (event) => {
        setPartner(event.target.value);
    };

    const goCourseDetail = (event) => {
        const data = `${event.row.id}`
        navigate(`/coursedetail/${event.row.id}`);
    }

    const countStyle = {
        height: "25px", 
        marginTop: "0", 
        marginLeft: "0", 
        paddingLeft: "0", 
        paddingTop: "0", 
        textAlign: "left", 
        fontSize: "15px", 
        fontWeight: "normal", 
        fontFamily: "fantasy"
    };


    const columns = [
        { field: 'name', headerName: '코스 이름', width: 200 },
        { field: 'replyCount', headerName: '댓글', width: 40 },
        { field: 'like', headerName: '추천', width: 40 },
    ];


    const createListGrid = (list) => {
        let items = [];
        list.forEach((item, i) => {
            items.push(createCourseGrid(item));
        });

        return items;
    }

    const createCourseGrid = (item) => {
        return (
        <Grid item xs={12} style={{marginBottom: "10px", }}>
            <Paper elevation={3} rounded>
                <Grid container spacing={2} style={{height: "165px", marginLeft: "2px", }}>
                    <Grid item xs={5} style={{paddingRight: "0"}}>
                        <CoursePreviewMapWrapper rows={item.latlng}/>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{height: "25px", lineHeight: "15px", fontWeight: "bolder", marginRight: "15px",  }}>
                                {item.course.name}
                            </Grid>
                            <Grid item xs={12} style={{height: "55px", marginBottom: "0", paddingBottom: "0", marginTop: "5px", paddingTop: "0"}}>
                                <p style={{height: "16px", lineHeight: "16px", paddingRight: "15px", marginTop: "5px", fontSize: "10px", }}>
                                    {item.course.description.slice(0, 50) + " ..."}
                                </p>
                            </Grid>
                            <Grid item xs={3} style={{height: "25px", marginTop: "0", marginRight: "0", paddingTop: "1px", }}>
                                <ThumbUpIcon style={{height: "17px"}} />
                            </Grid>
                            <Grid item xs={3} style={countStyle}>
                                {item.course.like}
                            </Grid>
                            <Grid item xs={3} style={{height: "25px", marginTop: "0", marginRight: "0", paddingTop: "3px", }}>
                                <CommentIcon style={{height: "17px"}} />
                            </Grid>
                            <Grid item xs={3} style={countStyle}>
                                {item.course.replyCount}
                            </Grid>
                            <Grid item xs={12} style={{height: "40px", marginLeft: "0", marginRight: "10px", paddingLeft: "0",}}>
                                <img src={ReadMoreIcon} style={{width: "85%", height: "40px", }} onClick={() => {
                                    navigate(`/coursedetail/${item.id}`);
                                }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
        );
    }

    const onhandlePost = async (data) => {
        CourseListSearch(data)
        .then((response) => {
            console.log('성공');
            console.log(response);
            setCourseList2(response);
        })
    }   

    useEffect(() => {
        call("/course", "GET", header, null)
            .then((response) => {
                let tmp = response.data;
                console.log(response.data);
                const arr = [];
                tmp.forEach((item, i) => {
                    item.course.id = item.id;
                    arr.push(item.course);
                })
                setCourseList(arr);
            })
    }, []);

    useEffect(() => {
        const data = new FormData();
        data.append('lat', pinPlace.lat)
        data.append('lng', pinPlace.lng)
        onhandlePost(data);
    },[pinPlace])

    useEffect(() => {
        console.log("courseList2:", courseList2);
        setListGrid(createListGrid(courseList2));
    }, [courseList2]);
    
    useEffect(() => {
    }, [listGrid])

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
                        </DataGrid>
                    </div>
                    </Container>
                    

            </TabPanel>
            <TabPanel value={value} index={1}>
                <div style={{ margin: "0 auto" }}>
                    <MapWrapper onMarked={onPlacePined} />
                </div>
                {/* 기존 코스 목록 */}
                {/* <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={courseList2}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onRowClick={goCourseDetail}
                        >

                        </DataGrid>
                </div> */}
                {/* 코스 목록 리뉴얼 */}
                <Grid container spacing={2}>
                    {listGrid}
                </Grid>
            </TabPanel>
        </Box>
    </>)
}

export default CourseList;