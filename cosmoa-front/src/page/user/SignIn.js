import * as React from 'react';

// import { useNavigate } from 'react-router-dom';
import { signin } from '../../service/ApiService';
import { Button, TextField, Link, Grid, Box, Typography, Container, Avatar } from '@material-ui/core';
// import { authService } from '../../fbase';
// import { onSocialClick } from '../../service/Auth';
import { authService, firebaseInstance } from '../../fbase';
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
    
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // var testuser = { email: 'user01@naver.com', password: 'asdf1234!' };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const joinData = {
            email: data.get('email'),
            password: data.get('password'),
        };


        // if ( joinData.email === testuser.email && joinData.password === testuser.password) {
        //     M.pop.alert('로그인 성공');
        //     console.log("로그인 성공!!");
        //     navigate("/");
        // } else {
        //     console.log("로그인 실패");
        //     M.pop.alert('로그인 실패');
        // }

        signin(JSON.stringify(joinData));
        console.log("전송 성공");
        M.pop.alert('로그인 성공');
        // navigate("/");

    };



    // const signin = async (data) => {
    //     signin("", "", JSON.stringify(data))
    //         .then((response) => {
    //             console.log(response);
    //         })
    //         navigate("/");
    //         console.log("전송 성공");
    // }

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
    //      history.push('/'); // location.href
    //   };


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
                        <Grid container spacing={{ xs: 2, md: 3 }} column={{ xs: 4, sm: 8, md: 12 }} >
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