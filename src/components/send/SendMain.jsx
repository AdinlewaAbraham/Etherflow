import React, { useContext, useState } from "react";
import TransactionsHistory from "./TransactionsHistory";
import Contact from "./Contact";
import SendForm from "./SendForm";
import { WalletBalance } from "./SendForm";
import { Chart } from "./TransactionsHistory";
import { TransactionContext } from "../../context/TransactionContext";

const SendMain = () => {
  const { currentAccount, connectWallet } = useContext(TransactionContext);
  return currentAccount ? (
    <div className="sendcard">
      <div>
        <h1 className="senddivlabel">Wallet Balance</h1>
        <WalletBalance />
      </div>
      <div>
        <h1 className="senddivlabel">Transactions Chart</h1>
        <Chart />
      </div>
      <div className="flexdiv">
        <div className="sendformdiv">
          <h1 className="senddivlabel">Transfer Form</h1>
          <SendForm />
        </div>
        <div className="contactdiv">
          <h1 className="senddivlabel">Beneficiaries</h1>
          <Contact />
        </div>
      </div>
      <div className="TransactionsHistorydiv">
        <h1 className="senddivlabel">Transaction History </h1>
        <TransactionsHistory />
      </div>
      <p style={{ color: "rgb(26, 22, 22)" }}> you cant see me</p>
    </div>
  ) : (
    <div className="notconnectedsend">
      <div className="notconnected">
        <p>Sorry, it seems you're not currently connected to Metamusk.</p>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    </div>
  );
};

export default SendMain;
