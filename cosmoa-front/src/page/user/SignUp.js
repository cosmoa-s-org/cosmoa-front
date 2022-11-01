import React from "react";
import { useState } from "react";
import { Container, Grid, Typography, TextField, Button, Select, MenuItem, FormHelperText } from "@mui/material";
import signup from '../../service/ApiService';
import styled from "@emotion/styled";

const FormHelperTexts = styled(FormHelperText)
`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

function SignUp() {
    const [emailError, setEmailError] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');

    const onhandlePost = async (data) => {
        //const { email, password } = data;
        //const postData = { email, password };

        console.log('성공');
        console.log(data);
        //history.push('/login');
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const joinData = {
            email: data.get('email'),
            password: data.get('password'),
            password2: data.get('password2'),
            nickname: data.get('nickname'),
        };
        const { email, password, password2, nickname} = joinData;

        //유효성 검사
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailRegex.test(email)) {
            setEmailError('올바른 이메일 형식이 아닙니다.');
        } else {
            setEmailError('');
        }
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegex.test(password)) {
            setPasswordState('패스워드는 숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요');
        } else {
            setPasswordState('');
        }

        // 비밀번호 같은지 체크
        if (password !== password2) {
            setPasswordError('패스워드가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }

        if (
            emailRegex.test(email) &&
            passwordRegex.test(password) &&
            password === password2
        ) {
            onhandlePost(joinData);
        }
    }
    return (<>
        <Container component="main" maxWidth="xs" style={{ marginTop: "3%" }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography align="center" component="h1" variant="h5">
                            회원가입
                        </Typography>

                    </Grid>

                    <Grid item xs={10}>
                        <TextField
                            autoComplete="email"
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일"
                            autoFocus
                            error={emailError !== '' || false}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button type="submit" variant="contained" style={{ marginTop: "2%" }}>인증</Button>
                    </Grid>

                    <Grid item xs={10}>
                        <TextField
                            autoComplete="current-password"
                            name="password"
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="패스워드"
                            error={passwordState !== '' || false}
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={10}>
                        <TextField
                            autoComplete="password2"
                            name="password2"
                            variant="outlined"
                            required
                            fullWidth
                            id="password2"
                            label="패스워드 재입력"
                            error={passwordError !== '' || false}
                        />
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            autoComplete="nickname"
                            name="nickname"
                            variant="outlined"
                            required
                            fullWidth
                            id="nickname"
                            label="닉네임" autoFocus
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button type="submit" variant="contained">중복확인</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <FormHelperTexts>{emailError}</FormHelperTexts>
                        <FormHelperTexts>{passwordState}</FormHelperTexts>
                        <FormHelperTexts>{passwordError}</FormHelperTexts>
                        <Button
                            type="submit"
                            fullWidth
                            sx={{ mt: 4, mb: 2}}
                            size= "large"
                            color="primary"
                        >
                            계정생성
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    </>)
}

export default SignUp;