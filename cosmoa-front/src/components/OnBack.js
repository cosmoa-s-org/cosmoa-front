import { useLocation } from "react-router-dom";

function OnBack() {
  const M = window.M;

  const location = useLocation();
  const history = useHistory();
  M.onBack(() => {
    if (["/login", "/home"].include(location.path)) {
      // login, home 화면에서 뒤로가기 버튼 클릭시
      if (window.confirm("앱을 종료하시겠습니까?")) M.sys.exit();
    } else {
      history.back();
    }
  });
}
