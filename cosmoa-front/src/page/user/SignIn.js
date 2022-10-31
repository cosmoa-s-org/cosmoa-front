import * as React from 'react';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { createTheme, Divider, ThemeProvider } from '@material-ui/core';
import { signin } from '../../service/ApiService';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@material-ui/core';
// import { authService } from '../../fbase';
import { onSocialClick } from '../../service/Auth';
import { authService, firebaseInstance } from '../../fbase';
import { useState } from 'react';


const theme = createTheme();

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const json = {
            email: data.get('email'),
            password: data.get('password'),
        };

        signin(json);
        console.log(json);
    };

    const onSocialClick = async (event) => {
        // console.log(event.target.name);
        const {
          target: { name },
        } = event;
        let provider;
        if (name === 'google') {
          provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
          provider = new firebaseInstance.auth.GithubAuthProvider();
        }
    
        const data = await authService.signInWithPopup(provider);
        console.log(data);
      };
    

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="이메일"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            로그인
                        </Button>
                        <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} column={{ xs: 4, sm: 8, md: 12}} marginTop={"5%"} >
                            <Grid item xs={12}>
                                <br />
                                <Button
                                    onClick={onSocialClick}
                                    fullWidth
                                    variant="contained"
                                    name="google"
                                >
                                    구글로 로그인하기</Button>
                            </Grid>
                        </Grid>
                        <br />
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Link href="/signup" variant="body2">
                                    {"아이디가 없다면 회원가입하세요."}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <br />
        </ThemeProvider>
    );
}