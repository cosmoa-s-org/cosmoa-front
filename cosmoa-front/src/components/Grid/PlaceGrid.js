import React from "react";
import { Grid, Paper, Card, CardMedia } from "@material-ui/core";
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


function PlaceGrid({ list }) {
    let navigate = useNavigate();

    const createListGrid = (list) => {
        let items = [];
        list.forEach((item, i) => {
            items.push(createPlaceGrid(item));
        });
        return items;
    }

    const createPlaceGrid = (item) => {
        return (
            <Grid item xs={12} style={{marginBottom: "10px", }}>
                <Paper elevation={3} rounded>
                    <Grid container spacing={2} style={{ height: "165px", marginLeft: "2px", }}>
                        <Grid item xs={5} style={{ paddingRight: "0" }}>
                            {/* 장소 img */}
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="150px"
                                    
                                    style={{ padding: "5px" }}
                                    image={atob(item.image)}
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={7}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} style={{ height: "25px", lineHeight: "15px", fontWeight: "bolder", marginRight: "15px" }}>
                                    {item.name}
                                </Grid>
                                <Grid item xs={12} style={{ height: "55px", marginBottom: "0", paddingBottom: "0", marginTop: "5px", paddingTop: "0" }}>
                                    <p style={{height: "16px", lineHeight: "16px", paddingRight: "15px", marginTop: "5px", fontSize: "10px", }}>
                                        {item.description.slice(0, 40) + " ..."}
                                    </p>
                                </Grid>
                                <Grid item xs={3} style={{height: "25px", marginTop: "0", marginRight: "0", paddingTop: "1px", }}>
                                    <ThumbUpIcon style={{height: "17px"}} />
                                </Grid>
                                <Grid item xs={3} style={countStyle}>
                                    {item.like}
                                </Grid>
                                <Grid item xs={3} style={{height: "25px", marginTop: "0", marginRight: "0", paddingTop: "3px", }}>
                                    <CommentIcon style={{height: "17px"}} />
                                </Grid>
                                <Grid item xs={3} style={countStyle}>
                                    {item.replyCount}
                                </Grid>
                                <Grid item xs={12} style={{height: "40px", marginLeft: "0", marginRight: "10px", paddingLeft: "0",}}>
                                <img src={ReadMoreIcon} style={{width: "85%", height: "40px", }} onClick={() => {
                                    navigate(`/placedetail/${item.id}`);
                                }}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }

    return (<>
        {createListGrid(list)}
    </>)
}

export default PlaceGrid;