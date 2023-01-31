import React from "react";
import "./Logo.css";
import { Link } from "react-router-dom";

const Logo = (p) => {
  return (
    <div className="logo">
      <Link to="/">
        <div style={{ position: "relative" }}>
          Ether
          <span className="flow">
            <span className="waveoverlay">flow</span>
            <span className="wave">flow</span>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
