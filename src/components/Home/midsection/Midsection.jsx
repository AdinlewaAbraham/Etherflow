import React from "react";
import "../midsection/midsection.css";
import GlowDiv from "./GlowDiv";
import SecureImg from "../../imgs/security.svg";
import ReliabilityImg from "../../imgs/Reliability.png";
import fastIcon from "../../imgs/clock.png";

const midsection = () => {
  return (
    <div>
      <div>
        <h1 className="headerMid">
          Easily and quickly transfer money to anyone 
        </h1>
        <h1>hello can you seee me</h1>
        <div className="glowDivMain">
          <GlowDiv
            img={fastIcon}
            header="Fast"
            desc="Send stuff very fast."
          />
          <GlowDiv
            img={SecureImg}
            header="Secure"
            desc="With wallet pairing send cryto safely."
          />
          <GlowDiv
            img={ReliabilityImg}
            header="Reliable"
            desc="we never disappoint with 24hr service."
          />
        </div>
      </div>
    </div>
  );
};

export default midsection;
