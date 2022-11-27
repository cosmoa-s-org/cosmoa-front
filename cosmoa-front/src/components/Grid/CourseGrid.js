import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { CoursePreviewMapWrapper } from "../../map/MapWrapper";
import { useNavigate } from "react-router-dom";
import ReadMoreIcon from "../../images/ReadMore.png";
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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

    return(<>
    {createListGrid(list)}
    </>)
}

export default CourseGrid;