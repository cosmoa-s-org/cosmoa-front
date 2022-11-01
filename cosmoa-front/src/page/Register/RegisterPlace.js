import { React, useState, useRef } from "react";
import { Button, Box, Link } from "@material-ui/core";
import imgName from "../../images/test.png";

function RegisterPlace() {

    const [imageURL, setImageURL] = useState(null);
    const imgRef = useRef();
    const onChangeImage = () => {
        const reader = new FileReader();
        const file = imgRef.current.files[0];
        console.log(file);

        reader.readAsDataURL(file);
        reader.onload = () =>{
            setImageURL(reader.result);
            console.log("이미지주소", reader.result);
        };
    };

    return(<>
        
        <br />
        <br />
        <br />

        <Box sx={{ backgroundcolor: '#cfe8fc', height: '100vh' }}><h1>Register Place Page</h1></Box>

        <input type="file" id="inputImage" />
        <button id="sendButton">보내기</button>
        <img src="" class="uploadImage"></img>

        <br />

        <img src={imgName} />

        <br />

        <input type="file"
            ref={imgRef}
            onChange={onChangeImage}
            ></input>

        <form>
            <label>
                장소 이름:
                <input type="text" name="placeName" />

                주소:
                <input type="text" name="address" />

                장소 설명:
                <input type="text" name="placeDescription" />
            </label>
            <input type="submit" value="Submit" />
        </form>
        
        <br />
        <br />
        
        <Link href="/main">
            <Button variant="contained">메인으로</Button>
        </Link>
        {/* <script>
            {document.querySelector("#sendButton").addEventListener("click", ()=>{
                let selectfile = document.querySelector("#inputImage").files[0];
                console.log(selectfile);
            })}
        </script> */}
    </>)
}

export default RegisterPlace;
