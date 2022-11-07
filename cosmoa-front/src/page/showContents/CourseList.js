import { Box, Container, Select, Typography, InputLabel, MenuItem, FormControl, Divider, Link } from "@material-ui/core";
import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

function CourseList() {
    const [partner, setPartner] = useState('');

    let navigate = useNavigate();

    const testCourse = [
        { id: "1", cname: "testcourse", user: "user" },
        { id: "2", cname: "testcourse1", user: "user" },
        { id: "3", cname: "testcourse2", user: "user" },
        { id: "4", cname: "testcourse3", user: "user" },
        { id: "5", cname: "testcourse4", user: "user" },
        { id: "6", cname: "testcourse5", user: "user" }
    ]

    const handleChange = (event) => {
        setPartner(event.target.value);
    };
    
    const columns = [
        { field: 'id', headerName: 'id', width: 70 },
        { field: 'cname', headerName: '코스 이름', width: 130 },
        { field: 'user', headerName: '등록자', width: 130 },
    ];

    const goCourseDetail = (event) => {
        const data = `${event.row.id}`
        console.log(data);
        navigate(`/coursedetail/${event.row.id}`);
    }
    
    return (<>
        <Typography variant="h4" > 여행 코스</Typography>
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
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={testCourse}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onRowClick={goCourseDetail}
                >
                <Link to={`/coursedetail/${testCourse.id}`} ></Link>

                </DataGrid>
            </div>


        </Container>
    </>)
}

export default CourseList;