import React from "react";
import { Box, Link, Button } from "@material-ui/core";

function RegisterCourse() {
    return(<>
    <br />
    <br />
    <br />
        <h1>Register Course Page</h1>

        <input type="file" id="inputImage" />
        <button id="sendButton">보내기</button>
        <img src="" class="uploadImage"></img>

        <br />

        <br />

        <form>
            <label>
                장소 이름:
                <input type="text" name="placeName" id="placeName" placeholder="장소 이름을 입력하세요"/>

                <br />
                <br />

                주소:
                <input type="text" name="address" id="address"/>

                <br />
                <br />

                장소 설명:
                <input type="text" 
                    id="placeDescription"
                    placeholder="설명을 입력하세요"
                />

                <br />
                <br />
            </label>
            <input type="submit" value="제출하기" />
        </form>
        
        <br />
        <br />
        
        <Link href="/main">
            <Button variant="contained">메인으로</Button>
        </Link>
        
    </>)
}

export default RegisterCourse;
