import React from "react";
import { Paper, Link } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";

function RegisterType() {
  const M = window.M;
  const location = useLocation();
  // const history = useHistory();
  let navigate = useNavigate();

  M.onBack(() => {
    if (["/signin", "/main"].include(location.path)) {
      // signin, main 화면에서 뒤로가기 버튼 클릭시
      if (window.confirm("앱을 종료하시겠습니까?")) M.sys.exit();
    } else {
      navigate.back();
    }
  });

  return (
    <>
      <h1>Select Register Course / Place</h1>

      <Link href="/registercourse">
        <Paper
          elevation={4}
          style={{
            height: 150,
            lineHeight: "150px",
            fontSize: 24,
            width: "90%",
            margin: "0 auto",
          }}
        >
          코스 등록
        </Paper>
      </Link>

      <br />

      <Link href="/registerplace">
        <Paper
          elevation={4}
          style={{
            height: 150,
            lineHeight: "150px",
            fontSize: 24,
            width: "90%",
            margin: "0 auto",
          }}
        >
          장소 등록
        </Paper>
      </Link>

      <br />
    </>
  );
}

export default RegisterType;
