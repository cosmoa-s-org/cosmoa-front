import { Button, Grid, Link, Paper, TextField } from "@material-ui/core";
import React from "react";

class PostDetail extends React.Component {
  

  render() {
    return (
      <>
        <center>
          <h1>모집글 상세</h1>
        </center>
        <Paper style={{ margine: 16, padding: 16 }}>
          <Grid container>
            <Grid xs={15} md={1} item>
              <h3>제목</h3>
            </Grid>
            <Grid xxs={50} md={11} item style={{ paddingRight: 16 }}>
              <p>AA프로젝트</p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={15} md={1} item>
              <h3>내용</h3>
            </Grid>
            <Grid xs={12} md={11} item style={{ paddingRight: 16 }}>
              <p>AA관련 내용으로 프로젝트를 함께할 팀원을 모집합니다.</p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={15} md={1} item>
              <h3>모집 인원</h3>
            </Grid>
            <Grid xxs={50} md={11} item style={{ paddingRight: 16 }}>
              <p>4</p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={15} md={1} item>
              <h3>프로젝트 기간</h3>
            </Grid>
            <Grid xs={12} md={11} item style={{ paddingRight: 16 }}>
              <p>2022-10-17 ~ 2022-12-31</p>
            </Grid>
          </Grid>
        </Paper>
        <hr />
        <center>
          <Link href="/postlist" variant="body2">
            <Button>지원하기</Button>
          </Link>
          <Link href="/postlist" variant="body2">
            <Button>목록으로</Button>
          </Link>
        </center>
      </>
    );
  }
}
export default PostDetail;
