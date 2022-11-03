import React from "react";
import { Box, Link, Button } from "@material-ui/core";

function RegisterCourse() {
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

                <Link href="/addcourse">
                    <Button variant="contained">코스 추가</Button>
                </Link>
            </label>

            <br />
            <br />

            <input type="submit" value="제출하기" />
        </form>
        
        <br />
        
        <Link href="/main">
            <Button variant="contained">메인으로</Button>
        </Link>
        
    </>)
}

export default RegisterCourse;
