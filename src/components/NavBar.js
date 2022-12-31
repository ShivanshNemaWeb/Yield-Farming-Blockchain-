import React from "react";
import bankLogo from '../bank.png';
const NavBar=(props)=>{
    return(
        <nav class="navbar navbar-expand-lg navbar-dark static-top" style={
            {
                background: "linear-gradient(155deg, rgba(0,0,0,1) 36%, rgba(38,38,154,1) 100%, rgba(0,212,255,1) 100%)"}}>
        <div class="container">
          <a class="navbar-brand" href="#" style={{display:"flex"}}>
            <img src={bankLogo} alt="..." height="36"/>
            <p className="text-white ml-3">Yield Farming</p>
          </a>
        </div>
        <div className="text-right">
          <p className="text-white">Account No: {props.account}</p>  
        </div>
      </nav>
    );
}
export default NavBar;