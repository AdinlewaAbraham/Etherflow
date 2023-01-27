import React, {useEffect} from "react";
import "../components/send/Send.css";
import SendMain from "../components/send/SendMain";
const send = () => {
  useEffect(() => {
    document.title = "Send";
  }, []);
  return (
    <>
      <SendMain />
    </>
  );
};

export default send;
