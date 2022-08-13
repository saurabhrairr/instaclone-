import React, { useEffect, useState } from 'react';
import axios from 'axios';
import camera from "./assest/camera.jpg"
import insta from "./assest/logo.png"
import { useNavigate } from 'react-router-dom';
import "./postview.css"
import paperplan from "./assest/2symbole.jpg"
const Postview =()=> {
    const navigate=useNavigate()
    const formpage=()=>{
        navigate("/Form")
    }
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        axios({
            url: "https://saurabhrai-11.herokuapp.com/post",
            method: "GET",
        }).then((itemdata)=>{
            setPosts(itemdata.data.item.reverse());
            console.log(itemdata.data);
        })
    },[])
    const cdate = new Date().toLocaleDateString();
  return (
    <div className='container'>
       <header>
<div className='nav'>
       <img  src={insta}  alt="logoimage"/> 
       <img id='lobo' onClick={formpage} src={camera}  alt="camera-image"/>
</div>
</header>
<hr/>
{
posts.map((item,i) => {
    return (
        <div className="Post" key={i} >
            <div className="user-information"  >
                <b className='name'>{item.name}</b>
                <p>{item.location}</p>
                 </div>
                {/* <span className="data-container-navbar"><img src="" alt="error" /></span> */}
                <div  className='dots'>
              <p>&#8226;&#8226;&#8226;</p>
                </div>
           
            {/* <section className="data-container-poster"><img src={item.postimage} alt="currently no detail" /></section> */}
            <div className='user-image'>
              <img  src={item.postimage} alt="images"></img>
               </div>

            <div className="data">
                <span><img src="https://icon-library.com/images/instagram-heart-icon/instagram-heart-icon-17.jpg"alt=" currently no detail" className="heart-img" /></span>
               <span><img src={paperplan} alt=" currently no detail" className="paper-plane" /></span> 
                <span className="date">{cdate}</span>
                <p className="likes">100 likes</p>
               </div>
            <footer className="footer"><p> {item.descripation}</p></footer>
        </div>
    )
})}
</div>
  );
}


export default Postview;


// <Link to="/Postview">   <button onClick={handleRoute}>Enter</button></Link>