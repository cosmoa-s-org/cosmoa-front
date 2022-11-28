import * as React from 'react';

// import { useNavigate } from 'react-router-dom';
import { signin } from '../../service/ApiService';
import { Button, TextField, Link, Grid, Box, Typography, Container, Avatar } from '@material-ui/core';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const M = window.M
    let navigate = useNavigate();
    React.useEffect(() => {
        M.onBack(() => {
            if(window.confirm('앱을 종료하시겠습니까?')) M.sys.exit(); 
        })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const joinData = {
            email: data.get('email'),
            password: data.get('password'),
        };

        signin(JSON.stringify(joinData));
        // console.log("전송 성공");
        // navigate("/");

    };

    return (<>
        {/* <button onClick={onLogOutClick}>Log out</button> */}
        <Container component="main" maxWidth="xs" style={{ marginTop: "30%" }}>
        <h1>Cosmoa</h1>
            <Box sx={{ marginTop: 8, alignItems: 'center' }} >
                <Avatar>
                    <LockOpenIcon />
                </Avatar>
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
                                type="password"
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
                </form>
            </Box>

        </Container>
        <br />
    </>);
}