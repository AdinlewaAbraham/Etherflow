import React, { useContext, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Web3 from "web3";
import CopyImg from "../imgs/copy-icon.svg";
import { TransactionContext } from "../../context/TransactionContext";
const Qrcode = () => {
  const { currentAccount, connectWallet } = useContext(TransactionContext);
  return (
    <div className="qrcode">
      {!currentAccount && (
        <div className="notconnected">
          <p>Sorry, it seems you're not currently connected to Metamusk.</p>
          <button  onClick={connectWallet}>Connect Wallet</button>
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
                  console.log("Text copied to clipboard");
                } catch (err) {
                  console.error("Failed to copy text: ", err);
                }
              }}
            />
            {currentAccount}
          </div>
        </div>
      )}
    </div>
  );
};

export default Qrcode;
