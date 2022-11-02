import React from "react";
import { useState } from "react";
import { Container, Box, Avatar, Typography, Paper, Grid, Button, ListItem, ListItemText, InputBase } from "@material-ui/core";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { styled } from '@mui/material/styles';
import { Stack } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



function Mypage(updateUser) {
    const [readOnly, setReadOnly] = useState(true);
    // const [titleData, setTitleData] = useState(user.title);

    const M = window.M

    let user = [{ email: "user01@naver.com" }, { nickname: "test" }, { gender: "male" }, { age: "25" }];

    // const onUpdateItem = (cmd)=>{
    //     setReadOnly(true);
    //     const currUser = {...user};
    //     currUser.title = titleData;
    //     if(cmd==='toggleChk') currUser.done = !currUser.done;
    //     updateUser(currUser);
    // }

    function infoList() {
        user.map((value, idx) => {
            console.log(value);
        })
    } 

    const userUpdate = (event) => {
        console.log("userUpdate 클릭");

    }

    return (<>
        <Container component="main" maxWidth="xs" style={{ marginTop: "3%" }}>
            <Box sx={{ marginTop: 8, alignItems: 'center', display: 'flex' }} >
                <Avatar>
                    <PersonPinIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    마이 페이지
                </Typography>
                <br />
                <Stack spacing={2}>
                    <Item>Email: user01@naver.com</Item>
                    <Item>Nickname: user01</Item>
                    <Item>Gender: Male</Item>
                    <Item>Age: 25</Item>
                    <ListItem>
                        <Item>Email
                            <ListItemText>
                                <InputBase
                                    type="text"
                                    inputProps={{ "aria-label": "naked", readOnly: readOnly }}
                                    id={user.id}
                                    name={user.id}
                                    fullWidth={true}
                                    // onChange={(e) => { setTitleData(e.target.value) }}
                                    onClick={(e) => {
                                        setReadOnly(false);
                                    }}
                                    // onKeyPress={(e) => {
                                    //     if (e.key === 'Enter') {
                                    //         onUpdateItem();
                                    //     }
                                    // }
                                    // }
                                    value={user.email}></InputBase>
                            </ListItemText>
                        </Item>
                    </ListItem>
                </Stack>
                <br />
                <Button onClick={userUpdate}>회원 정보 수정</Button>
            </Box>
        </Container>

    </>)
}

export default Mypage;