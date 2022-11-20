import { Box, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { call } from "../../service/ApiService";
import CourseReportList from "./CourseReportList";
import PlaceReportList from "./PlaceReportList";

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
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function Report() {
    const [placeReports, setPlaceReports] = useState([]);
    const [courseReports, setCourseReports] = useState([]);
    const [value, setValue] = useState(0);

    useEffect(() => {
        call("/place-report", "GET", {}, null)
        .then((response) => {
            console.log(response.data);
            setPlaceReports(response.data);
        });

        call("/course-report", "GET", {}, null)
        .then((response) => {
            console.log(response);
            setCourseReports(response.data);
        });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
      return (
        <div style={{ width: "100%", marginTop: "10%", textAlign: "center"}} >
            <Box sx={{ width: '100%'}}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ textAlign: "center"}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                        <Tab label="여행 장소 신고 목록" {...a11yProps(0)} style={{ "flex-grow": 1, width: "50%" }}/>
                        <Tab label="여행 코스 신고 목록" {...a11yProps(1)} style={{ "flex-grow": 1, width: "50%" }}/>
                        </Tabs>
                    </Grid>
                </Grid>
                <TabPanel value={value} index={0}>
                    <PlaceReportList placeReports={placeReports}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CourseReportList courseReports={courseReports}/>
                </TabPanel>
            </Box>
        </div>
      );
}

export default Report;