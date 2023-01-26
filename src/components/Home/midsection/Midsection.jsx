import React from "react";
import "../midsection/midsection.css";
import SecureImg from "../../imgs/security.svg";
import ReliabilityImg from "../../imgs/Reliability.png";
import fastIcon from "../../imgs/clock.png";

const GlowDiv = (p) => {
  return (
    <div className="glowDiv">
      <div className="glowDivImgDiv" >
        <img className="glowDivImg" src={p.img} alt=""/>
      </div>
      <div>
        <h4>{p.header}</h4>
        <p>{p.desc}</p>
      </div>
    </div>
  );
};

const midsection = () => {
  return (
    <div>
      <div>
        <h1 className="headerMid">
          Easily and quickly transfer money to anyone 
        </h1>
        <div className="glowDivMain">
          <GlowDiv
            img={fastIcon}
            header="Fast"
            desc="Speedy crypto transfer with our platform."
          />
          <GlowDiv
            img={SecureImg}
            header="Secure"
            desc="Secure crypto transfer with Metamask pairing."
          />
          <GlowDiv
            img={ReliabilityImg}
            header="Reliable"
            desc="Dependable crypto transfer with our platform."
          />
        </div>
      </div>
    </div>
  );
};

export default midsection;
