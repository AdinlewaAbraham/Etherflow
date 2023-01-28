import React, { useEffect } from "react";
import Qrcode from "../components/send/Qrcode";


const Receive = () => {
  useEffect(() => {
    document.title = "Receive";
  }, []);
  return (
    <div>
      <Qrcode />
    </div>
  );
};

export default Receive;
