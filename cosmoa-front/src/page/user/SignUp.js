import React from "react";
import { useState } from "react";
import { Container, Grid, Typography, TextField, Button, Select, MenuItem, FormHelperText, ToggleButton, ToggleButtonGroup, Avatar } from "@mui/material";
import { call } from '../../service/ApiService';
import styled from "@emotion/styled";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";


const FormHelperTexts = styled(FormHelperText)
    `
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;


function SignUp() {
    const M = window.M
    const navigate = useNavigate();

    React.useEffect(() => {
        M.onBack(() => {
            navigate('/signin');
        });
    }, [])

    const [emailError, setEmailError] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');

    const header = { "Content-Type": "application/json" }


    const SelectBox = (props) => {
        function menuitems() {
            var array = [];
            for (var i = 10; i < 90; i++) {
                array.push(<MenuItem value={i}>{i}</MenuItem>)
            }
            return array;
        }
        return (
            <Select required fullWidth value={age} onChange={ageChange}>
                {menuitems()}
            </Select>
        )
    }

    const genderChange = (event, newGender) => {
        setGender(newGender);
        console.log("newGender", newGender);
    };

    const ageChange = (event) => {
        setAge(event.target.value);
        console.log(age);
    };

    const onhandlePost = async (data) => {
        //const { email, password } = data;
        //const postData = { email, password };
        console.log(data);
        call("/user", "POST", header, JSON.stringify(data))
            .then((response) => {
                console.log(response);
            })
        console.log('성공');
        console.log(data);

        navigate("/signin");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const joinData = {
            email: data.get('email'),
            password: data.get('password'),
            nickname: data.get('nickname'),
            gender: gender,
            age: age,
            type: 1
        };
        const password2 = data.get('password2')
        console.log(joinData);
        const { email, password, nickname } = joinData;
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
            M.pop.alert('성공');
            console.log(joinData);
        }
    }
    return (<>
        <Container component="main" maxWidth="xs" style={{ marginTop: "20%" }}>
            <h1>Cosmoa</h1>
            <Avatar>
                <PersonIcon />
            </Avatar>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography align="center" component="h1" variant="h5">
                            회원가입
                        </Typography>

                    </Grid>

                    <Grid item xs={12}>
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

                    <Grid item xs={12}>
                        <TextField
                            autoComplete="current-password"
                            name="password"
                            variant="outlined"
                            type="password"
                            required
                            fullWidth
                            id="password"
                            label="패스워드"
                            error={passwordState !== '' || false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="password2"
                            name="password2"
                            variant="outlined"
                            type="password"
                            required
                            fullWidth
                            id="password2"
                            label="패스워드 재입력"
                            error={passwordError !== '' || false}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            autoComplete="nickname"
                            name="nickname"
                            variant="outlined"
                            required
                            fullWidth
                            id="nickname"
                            label="닉네임"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ marginTop: 1 }}>성별</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <ToggleButtonGroup
                            color="primary"
                            value={gender}
                            exclusive
                            fullWidth
                            required
                            onChange={genderChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value={0}>Male</ToggleButton>
                            <ToggleButton value={1}>Female</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ marginTop: 1 }}>나이</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <SelectBox onChange={ageChange}></SelectBox>
                    </Grid>

                    <Grid item xs={12}>
                        <FormHelperTexts>{emailError}</FormHelperTexts>
                        <FormHelperTexts>{passwordState}</FormHelperTexts>
                        <FormHelperTexts>{passwordError}</FormHelperTexts>
                        <Button
                            type="submit"
                            fullWidth
                            sx={{ mt: 4, mb: 2 }}
                            size="large"
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