import React from "react";
import { useState } from "react";
import { Container, Box, Avatar, Typography, Paper, Button, ListItemText, InputBase, Divider, FormHelperText } from "@material-ui/core";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { styled } from '@mui/material/styles';
import { Stack } from "@mui/material";
import { userUpdate } from "../../service/ApiService";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const FormHelperTexts = styled(FormHelperText)
    `
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;


function Mypage() {
    const [readOnly, setReadOnly] = useState(true);
    // const [titleData, setTitleData] = useState(user.title);
    const [passwordState, setPasswordState] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password2, setPassword2] = useState('');

    const M = window.M
    // const [user, setUser] = useState({ email: "user01@naver.com", nickname: "test", gender: "male", age: "25" });

    let email = JSON.parse(localStorage.getItem("USER")).email
    let nickname = JSON.parse(localStorage.getItem("USER")).nickname
    let gender = JSON.parse(localStorage.getItem("USER")).gender
    let age = JSON.parse(localStorage.getItem("USER")).age
    let password = ""
    const [user, setUser] = useState({ email: email, password: password, nickname: nickname, gender: gender, age: age});

    const updateStart = (event) => {
        console.log("updateClicked 클릭");
        setReadOnly(false);
    }

    const updateEnd = (event) => {
        console.log("updateClicked 클릭");
        event.preventDefault();
        // let password = event.currentTarget
        // let password2 = event.currentTarget
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegex.test(user.password)) {
            setPasswordState('패스워드는 숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요');
        } else {
            setPasswordState('');
        }
        // 비밀번호 같은지 체크
        if (user.password !== password2) {
            setPasswordError('패스워드가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }
        if (
            passwordRegex.test(user.password) &&
            user.password === password2
        ) {
            setReadOnly(true);
            userUpdate(user)
            console.log(user.password);
            console.log(password2);
            console.log(user.nickname);
            M.pop.alert("수정완료!");
        }
    }

    return (<>
        <Container component="main" maxWidth="xs" style={{ marginTop: "3%" }}>
            <Box sx={{ marginTop: 8, alignItems: 'center'}} >
                <Avatar>
                    <PersonPinIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    마이 페이지
                </Typography>
                <br />
                <form onSubmit={updateEnd}>
                <Stack spacing={2} maxWidth>
                        <Item>
                            <ListItemText>Email
                                <InputBase
                                    type="text"
                                    inputProps={{ "aria-label": "naked"}}
                                    id="email"
                                    name="email"
                                    fullWidth={true}
                                    value={user.email}
                                    readOnly
                                    onChange={(e) => { 
                                        setUser({...user, email: e.currentTarget.value}) }}
                                ></InputBase>
                            </ListItemText>
                            <Divider />
                            <ListItemText>Password
                                <InputBase
                                    type="text"
                                    inputProps={{ "aria-label": "naked", readOnly: readOnly }}
                                    id="password"
                                    name="password"
                                    fullWidth={true}
                                    value={user.password}
                                    onChange={(e) => { 
                                        setUser({...user, password: e.currentTarget.value}) }}
                                ></InputBase>
                            </ListItemText>
                            <Divider />
                            <ListItemText>Password 재입력
                                <InputBase
                                    type="text"
                                    inputProps={{ "aria-label": "naked", readOnly: readOnly }}
                                    id="password2"
                                    name="password2"
                                    fullWidth={true}
                                    value={password2}
                                    onChange={(e) => { 
                                        setPassword2(e.currentTarget.value) }}
                                ></InputBase>
                            </ListItemText>
                            <Divider />
                            <ListItemText>Nickname
                                <InputBase
                                    type="text"
                                    inputProps={{ "aria-label": "naked", readOnly: readOnly }}
                                    id="nickname"
                                    name="nickname"
                                    fullWidth={true}
                                    value={user.nickname}
                                    onChange={(e) => { 
                                        setUser({...user, nickname: e.currentTarget.value}) }}
                                ></InputBase>
                            </ListItemText>
                            <Divider />
                            <ListItemText>Gender
                                <InputBase
                                    type="text"
                                    inputProps={{ "aria-label": "naked", readOnly: readOnly }}
                                    id="gender"
                                    name="gender"
                                    fullWidth={true}
                                    value={user.gender}
                                    onChange={(e) => { 
                                        setUser({...user, gender: e.currentTarget.value}) }}
                                ></InputBase>
                            </ListItemText>
                            <Divider />
                            <ListItemText>Age
                                <InputBase
                                    type="text"
                                    inputProps={{ "aria-label": "naked", readOnly: readOnly }}
                                    id="age"
                                    name="age"
                                    fullWidth={true}
                                    value={user.age}
                                    onChange={(e) => { 
                                        setUser({...user, age: e.currentTarget.value}) }}
                                ></InputBase>
                            </ListItemText>
                        </Item>
                </Stack>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                <br />
                <Button onClick={updateStart}>회원 정보 수정</Button>
                <br />
                <Button onClick={updateEnd}>저장</Button>
                </form>
            </Box>
        </Container>
    </>)
}

export default Mypage;