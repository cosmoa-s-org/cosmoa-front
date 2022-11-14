import { Box, Button, Container, Divider, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import MapWrapper from "../../map/MapWrapper";
import { call } from "../../service/ApiService";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { positions } from "@mui/system";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Avatar } from "@mui/material";
import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

function CourseDetail() {
    const [placeList, setplaceList] = useState([]);
    const [course, setCourse] = useState({
        course: { id: 0, name: "", description: "", createdDate: "", modifiedDate: "" },
        nickname: "", isLike: 0, like: 0
    });
    const [liked, setLiked] = useState('');
    // const likeBtn = liked ? '<ThumbUpAltIcon />' : '<ThumbUpOffAltIcon />';
    let userId = JSON.parse(localStorage.getItem("USER")).id

    const params = useParams();
    const cid = params.id

    const [placeListTable, setPlaceListTable] = useState(<>Loading...</>);

    useEffect(() => {
        call(`/course/detail?courseId=${cid}&userId=${userId}`, "GET", null) // 코스 정보 받아오기
            .then((response) => {
                console.log(response);
                setCourse(response.data);
            })
        call(`/course-compose/${cid}`, "GET", null) // 코스에 포함된 장소 정보 받아오기
            .then((response) => {
                console.log(response);
                setplaceList(response.data);
            })
    }, []);

    // useEffect( () => {
    //     let tmp = "";
    //     placeList.forEach((item, i) => {
    //         tmp += item.place.name
    //     })
    //     setPlaceListTable(<>
    //     {tmp}   
    //     </>);
    // }, [placeList])

    useEffect( () => {
        setPlaceListTable(<> 출발
        {placeList.map((item, i) => {
            return(<>
            {'->  '} {item.place.name} 
            </>)
        })}
        </>);
    }, [placeList])

    const likeBtnClicked = (event) => {

    }
    

    return (<>
        <Typography variant="h4" style={{ marginTop: "15%" }}>{course.course.name}</Typography>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 128,
                    height: 128,
                },
            }}>
            <div style={{ margin: "0 auto" }}>
                <MapWrapper />
            </div>
            <Container style={{ textAlign: "initial" }}>
                    추천수 : {course.like}
                    <Button
                        style={{ backgroundColor: "floralwhite", flex: 1, alignItems: "center", flexDirection: "row" }}
                        onClick={likeBtnClicked}
                    ><ThumbUpOffAltIcon /></Button>
                    
                <Paper>{cid} <br/>
                코스 순서 <br/>
                 {placeListTable} <br/>
                {course.course.description} </Paper>
                </Container>

        </Box>
    </>)
}

export default CourseDetail;
