import { Link } from "react-router-dom";
import  icon from "./assest/icon.jpg"
import  "./landingpage.css"
const Landingpage =()=> {

       const handleRoute=()=>
       {

       }
       return(
<>
<div className="main">
       <img src={icon} alt="10xteamenterimage"/>
       <div className="second">
              <ul>
       <p>
              10x Team 04
       </p>
    <Link to="/Postview">  <button onClick={handleRoute}>Enter</button></Link>
    </ul>
    </div>
</div>
</>
 );
       
}
export default Landingpage