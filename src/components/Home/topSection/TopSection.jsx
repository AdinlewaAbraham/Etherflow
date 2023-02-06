import React, { useEffect } from "react";
import "./TopSection.css";
import BlurSpot from "./BlurSpot";
import Earth from "../earth/Earth";
import { useNavigate } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

export function TopSection() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      once: true, // only animate once when the element is in view
    });
  }, []);
  return (
    <div className="main">
      {/* <BlurSpot top="10px" right="0px" />
      <BlurSpot top="0px" left="10px" />
      <BlurSpot top="100px" left="40px" /> */}
      <div className="content">
        <div className="description">
          <h1 className="header centerme" data-aos="fade-in" data-aos-delay="100">
            Send and receive crypto easily from anywhere in the world
          </h1>
          <p className="subHeader centerme" data-aos="fade-in" data-aos-delay="300">
            Our platform allows for easy and secure transfer of cryptocurrency
            globally, enabling you to send and receive crypto from anywhere in
            the world with ease.
          </p>
          <div style={{ display: "flex" }} className="centerme" data-aos="fade-up">
            <button
              onClick={() => {
                navigate("/send");
              }}
              className="startNow"
            >
              Send
            </button>
            <button
              onClick={() => {
                navigate("/receive");
              }}
              className="startNow"
            >
              Receive
            </button>
          </div>
        </div>
        <div>
          <Earth />
        </div>
      </div>
    </div>
  );
}
