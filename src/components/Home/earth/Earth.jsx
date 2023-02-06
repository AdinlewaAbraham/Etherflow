import React, { useState } from "react";
import React3dEarth from "react-3d-earth";

const earth = () => {
  const [cursor, setCursor] = useState("auto");

  const handleMouseDown = () => {
    setCursor("grabbing");
  };

  const handleMouseUp = () => {
    setCursor("grab");
  };

  return (
    <div
      className="earth"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ cursor: cursor }}
    >
      <React3dEarth
      className="ReactEarth"
        style={{
          width: "472px",
          height: "480px",
          //position: "absolute",
          zIndex: "1",
          //top: "10px",
        }}
        config={{
          radius: 20,
          // mobileRadius: 20,
          backgroundColor: "black",
           flagScale:0,
          // flagLat:39.56,
          // flagLon: 116.20,
          // flagColor: 'green'
          dotColor: "#5b0eeb",
          // autoRotationSpeed: 3,
          // draggingRotationSpeed:5,
          // textureSrc: '/images/map.png'
        }}
      />
    </div>
  );
};

export default earth;
