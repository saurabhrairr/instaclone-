
import camera from "./assest/camera.jpg"
import insta from "./assest/logo.png"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import FileBase64 from "react-file-base64";
import React from "react";
const Form = ()=>{
    const [posts,setPosts] = useState({});
    const navigate = useNavigate();
    const handlePosts =()=>{
        axios({
            url: "https://saurabhrai-11.herokuapp.com/post",
            method: "POST",
            headers: {

            },
            data: posts
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        navigate("/Postview");
    }
    return(
        <>
        <div className="container">
        <header>
<div className='nav'>
       <img src={insta}  alt="logoimage"/>
       <img id='lobo' src={camera}  alt="camera-image"/>
</div>
</header>
<hr/>

            <form>
                <div className="secondcontainer">
                <div className="fileupload">
                {}
                <FileBase64
          type="file" 
          multiple={false}
          onDone={({ base64 }) => setPosts({ ...posts, postimage: base64 })}
        />
                </div>
                <div className="details">
                    <span>
                    <input type="text" id="author" placeholder="Author" onChange={(e)=>{setPosts({...posts,name:e.target.value})}}/>
                    </span>
                    <span>
                        <input type="text" id="location" placeholder="Location" onChange={(e)=>{setPosts({...posts,location: e.target.value})}}/>
                    </span>
                </div>
                <div className="descripation">
                    <input type="text" id="description" placeholder="Description" onChange={(e)=>{setPosts({...posts,descripation: e.target.value})}}/>
                </div>
                <div className="submit">
                <button type="submit" id="button2" onClick={handlePosts}>Post</button>

                </div>
                </div>

            </form>
        </div>
        </>
    )
};

export default Form;