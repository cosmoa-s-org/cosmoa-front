import React from "react";
import { Grid, Paper } from "@material-ui/core";
import CoursePreviewMapWrapper from "../../map/MapWrapper";
import { useNavigate } from "react-router-dom";

function CourseGrid({list}) {
    let navigate = useNavigate();

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
                            <Grid item xs={12} style={{height: "25px", lineHeight: "15px", fontWeight: "bolder", }}>
                                {item.course.name}
                            </Grid>
                            <Grid item xs={12} style={{height: "60px", marginBottom: "0", paddingBottom: "0", marginTop: "0", paddingTop: "0"}}>
                                <p style={{height: "16px", lineHeight: "16px", paddingRight: "15px", marginTop: "5px", }}>
                                    {item.course.description.slice(0, 40) + " ..."}
                                </p>
                            </Grid>
                            <Grid item xs={4} style={{height: "25px", marginTop: "0", paddingTop: "0", }}>
                                좋아요
                            </Grid>
                            <Grid item xs={8} style={{height: "25px", marginTop: "0", paddingTop: "0", }}>
                                {item.course.like}개
                            </Grid>
                            <Grid item xs={4} style={{height: "25px", marginTop: "0", paddingTop: "0", }}>
                                댓글수
                            </Grid>
                            <Grid item xs={8} style={{height: "25px", marginTop: "0", paddingTop: "0", }}>
                                {item.course.replyCount}개
                            </Grid>
                            <Grid item xs={12} style={{height: "25px"}}>
                                <p style={{height: "15px", lineHeight: "5px", fontWeight: "bolder", marginTop: "0", }} 
                                onClick={() => {
                                    navigate(`/coursedetail/${item.id}`);
                                }}>{"Read More >"}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
        );
    }

    return(<>
    {createListGrid(list)}
    </>)
}

export default CourseGrid;