import React from "react";
import { useState } from "react";
import { Container, Box, Avatar, Typography, Paper, Grid, Button, ListItem, ListItemText, InputBase, Divider } from "@material-ui/core";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { styled } from '@mui/material/styles';
import { Stack } from "@mui/material";
import { gridSelectionStateSelector } from "@mui/x-data-grid";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));



function Mypage() {
    const [readOnly, setReadOnly] = useState(true);
    // const [titleData, setTitleData] = useState(user.title);

    const M = window.M
    const [user, setUser] = useState({ email: "user01@naver.com", nickname: "test", gender: "male", age: "25" });


    // const onUpdateItem = (cmd)=>{
    //     setReadOnly(true);
    //     const currUser = {...user};
    //     currUser.title = titleData;
    //     if(cmd==='toggleChk') currUser.done = !currUser.done;
    //     updateUser(currUser);
    // }

    // function btnClicked() {
    //     const btnElement = document.getElementById('btn');
    //     btnElement.innerText = '수정 완료!';
    // }

    const updateClicked = (event) => {
        console.log("updateClicked 클릭");
        setReadOnly(false);
    }

    const userUpdate = (event) => {
        console.log("userUpdate 클릭");
        setReadOnly(true);
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
                <Stack spacing={2} maxWidth>
                        <Item>
                            <ListItemText>Email
                                <InputBase
                                    type="text"
                                    inputProps={{ "aria-label": "naked", readOnly: readOnly }}
                                    id={user.id}
                                    name={user.id}
                                    fullWidth={true}
                                    value={user.email}
                                ></InputBase>
                            </ListItemText>
                            <Divider />
                            <ListItemText>Nickname
                                <InputBase
                                    type="text"
                                    inputProps={{ "aria-label": "naked", readOnly: readOnly }}
                                    id={user.id}
                                    name={user.id}
                                    fullWidth={true}
                                    value={user.nickname}
                                    onChange={(e) => { setUser({ nickname: e.currentTarget.value }) }}
                                ></InputBase>
                            </ListItemText>
                            <Divider />
                            <ListItemText>Gender
                                <InputBase
                                    type="text"
                                    inputProps={{ "aria-label": "naked", readOnly: readOnly }}
                                    id={user.id}
                                    name={user.id}
                                    fullWidth={true}
                                    value={user.gender}
                                    onChange={(e) => { setUser({ gender: e.currentTarget.value }) }}
                                ></InputBase>
                            </ListItemText>
                            <Divider />
                            <ListItemText>Age
                                <InputBase
                                    type="text"
                                    inputProps={{ "aria-label": "naked", readOnly: readOnly }}
                                    id={user.id}
                                    name={user.id}
                                    fullWidth={true}
                                    value={user.age}
                                    onChange={(e) => { setUser({ age: e.currentTarget.value }) }}
                                ></InputBase>
                            </ListItemText>
                        </Item>
                </Stack>
                <br />
                <Button onClick={updateClicked}>회원 정보 수정</Button>
                <Button onClick={userUpdate}>수정 완료</Button>
            </Box>
        </Container>
    </>)
}

export default Mypage;