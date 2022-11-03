import React from "react";
import { Box, Link, Button } from "@material-ui/core";

function RegisterCourse(props) {
    return(<>
    <br />
    <br />
    <br />
        <h1>Register Course Page</h1>

        <form>
            <label>
                코스 이름:
                <input type="text" name="courseName" id="courseName" placeholder="코스 이름을 입력하세요"/>

                <br />
                <br />

                코스 설명:
                <input type="text" 
                    id="courseDescription"
                    placeholder="설명을 입력하세요"
                />

                <br />
                <br />

                <Link href="/addplace">
                    <Button variant="contained">코스에 장소 추가</Button>
                </Link>

                {/* <input type="text" >장소1</input>
                <input type="text" >장소1 소요시간</input> */}
                
            </label>

            <br />
            <br />

            <input type="submit" value="제출하기" />
        </form>
        
        <br />
        
        <Button variant="contained" href="/main">메인으로</Button>
        
    </>)
}

export default RegisterCourse;
