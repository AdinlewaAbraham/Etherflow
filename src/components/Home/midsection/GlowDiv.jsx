import React from "react";
import "../midsection/midsection.css";

const glowDiv = (p) => {
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

export default glowDiv;
