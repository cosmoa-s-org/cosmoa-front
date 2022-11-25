import React from "react";
import { Grid, Paper, Card, CardMedia } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

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
            <Grid item xs={12} style={{ marginBottom: "10px", }}>
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
                                <Grid item xs={12} style={{ height: "25px", lineHeight: "15px", fontWeight: "bolder", }}>
                                    {item.name}
                                </Grid>
                                <Grid item xs={12} style={{ height: "60px", marginBottom: "0", paddingBottom: "0", marginTop: "0", paddingTop: "0" }}>
                                    <p style={{ height: "16px", lineHeight: "16px", paddingRight: "15px", marginTop: "5px", }}>
                                        {item.description.slice(0, 40) + " ..."}
                                    </p>
                                </Grid>
                                <Grid item xs={4} style={{ height: "25px", marginTop: "0", paddingTop: "0", }}>
                                    좋아요
                                </Grid>
                                <Grid item xs={8} style={{ height: "25px", marginTop: "0", paddingTop: "0", }}>
                                    {item.like}개
                                </Grid>
                                <Grid item xs={4} style={{ height: "25px", marginTop: "0", paddingTop: "0", }}>
                                    댓글수
                                </Grid>
                                <Grid item xs={8} style={{ height: "25px", marginTop: "0", paddingTop: "0", }}>
                                    {item.replyCount}개
                                </Grid>
                                <Grid item xs={12} style={{ height: "25px" }}>
                                    <p style={{ height: "15px", lineHeight: "5px", fontWeight: "bolder", marginTop: "0", }}
                                        onClick={() => {
                                            navigate(`/placedetail/${item.id}`);
                                        }}>{"Read More >"}</p>
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