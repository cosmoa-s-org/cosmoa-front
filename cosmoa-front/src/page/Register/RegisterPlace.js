import { React, useState, useRef } from "react";
import { Button, Box, Link, TextField } from "@material-ui/core";
import imgName from "../../images/test.png";
import MapWrapper from "../../map/MapWrapper";

function RegisterPlace() {
    const M = Window.M;

    const [current, setCurrent] = useState([]);

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

        {/* <Box sx={{ backgroundcolor: '#cfe8fc', height: '100vh' }}> */}
            <h1>Register Place Page</h1>
        {/* </Box> */}

            <div style={{margin:"0 auto"}}>
                <MapWrapper />
            </div>

        <img src={imgName} />

        <br />

        <input type="file" id="inputImage" />
        <img src="" class="uploadImage"></img>

        <form>
            <label>
            
                <br />
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

                <input type="hidden" name="lat" />
                <input type="hidden" name="lng" />

                <br />
                
            </label>
            <input type="submit" value="제출하기" />
        </form>
        
        <br />
        <br />
        
        <Button variant="contained" href="/main">메인으로</Button>

        {/* <script>
            {document.querySelector("#sendButton").addEventListener("click", ()=>{
                let selectfile = document.querySelector("#inputImage").files[0];
                console.log(selectfile);
            })}
        </script> */}
    </>)
}

export default RegisterPlace;
