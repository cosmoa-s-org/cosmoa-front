import * as React from 'react';

import { useNavigate } from 'react-router-dom';

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
        let provider = '';
        if (name === 'google') {
          provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
          provider = new firebaseInstance.auth.GithubAuthProvider();
        }
    
        const data = await authService.signInWithPopup(provider);
        console.log(data);
      };
    //   const history = useNavigate();
    //   const onLogOutClick = () => {
    //     authService.signOut();
    //     // history.push('/'); // location.href
    //   };
    

    return (<>
      {/* <button onClick={onLogOutClick}>Log out</button> */}
            <Container component="main" maxWidth="xs" style={{ marginTop: "3%" }}>
                <Box sx={{marginTop:8, alignItems:'center', display:'flex'}} >

                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>

                <form onSubmit={handleSubmit}>
                    {" "}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소" name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="패스워드" name="password"
                                autoComplete="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                로그인
                            </Button>
                        </Grid>
                        </Grid>
                        <Link href="/signup" variant="body2">
                            <Grid item xs={12}>가입하러가기 </Grid>
                        </Link>
                        <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} column={{ xs: 4, sm: 8, md: 12}} >
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

                </form>
                </Box>

            </Container>
            <br />
    </>);
}