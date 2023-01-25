import React from "react";
import "./TopSection.css";
import BlurSpot from "./BlurSpot";
import Earth from "../earth/Earth";
import { useNavigate  } from "react-router-dom";

export function TopSection() {
  const navigate = useNavigate();
  return (
    <div className="main">
      {/* <BlurSpot top="10px" right="0px" />
      <BlurSpot top="0px" left="10px" />
      <BlurSpot top="100px" left="40px" /> */}
      <div className="content">
        <div className="description">
          <h1 className="header">
            Send and receive crypto easily from anywhere in the world
          </h1>
          <p className="subHeader">
            Send crypto online from any part to the UK and other European
            countries with ease.
          </p>
          <div style={{display: "flex"}}>
          <button onClick={()=>{ navigate("/send")}} className="startNow">Send</button>
          <button onClick={()=>{ navigate("/receive")}} className="startNow">Receive</button></div>
        </div>
        <Earth />
      </div>
    </div>
  );
}
