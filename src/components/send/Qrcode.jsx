import React, { useContext, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Web3 from "web3";
import CopyImg from "../imgs/copy-icon.svg";
import { TransactionContext } from "../../context/TransactionContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Qrcode = () => {
  const notify = () =>
    toast("Text copied!", {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const { currentAccount, connectWallet } = useContext(TransactionContext);
  return (
    <div className="qrcode">
      {!currentAccount && (
        <div className="notconnected">
          <p>Sorry, it seems you're not currently connected to Metamusk.</p>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      )}
      {currentAccount && (
        <div className="qrcodediv">
          <h1>scan qr code</h1>
          <p>scan to get wallet address</p>
          <div>
            <QRCode value={currentAccount} />
          </div>
          <div>
            <img
              src={CopyImg}
              alt=""
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(currentAccount);
                  notify();
                } catch (err) {
                  console.error("Failed to copy text: ", err);
                }
              }}
            />
            {currentAccount}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Qrcode;
