import React, { useContext, useState, useCallback, useEffect } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { shortenAddress } from "../../utils/shortenAddress";
import { Loader } from "..";
import Web3 from "web3";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBfov3VF_pR4J-9-kypPWTRb4mCEsThGaA",
  authDomain: "contact-8a1b2.firebaseapp.com",
  projectId: "contact-8a1b2",
  storageBucket: "contact-8a1b2.appspot.com",
  messagingSenderId: "134623457144",
  appId: "1:134623457144:web:52b071dc99dec7d6ede28d",
  measurementId: "G-KCR7H2L9N5",
};

import { CircularProgress } from "@material-ui/core";

// init firebase app
const app = initializeApp(firebaseConfig);

//init services
const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser;
const currentTime = new Date().toLocaleString();

if (typeof window.ethereum !== "undefined") {
  window.ethereum.on("accountsChanged", function (accounts) {
    location.reload();
  });
}

export const WalletBalance = () => {
  const [conversionRate, setConversionRate] = useState(0);
  const [usdValue, setUsdValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [walletBalance, setwalletBalance] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) => {
        setConversionRate(data.ethereum.usd);
        setUsdValue(walletBalance * conversionRate);
        setIsLoading(false);
      });
  }, [walletBalance]);

  const { currentAccount } = useContext(TransactionContext);
  const [formattedBalance, setformattedBalance] = useState("");
  const getWalletBalance = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      try {
        const address = await web3.eth.getAccounts();
        const balanceWei = await web3.eth.getBalance(address[0]);
        const balanceEther = web3.utils.fromWei(balanceWei, "ether");
        await setwalletBalance(balanceEther);

        var parts = walletBalance.split(".");
        var decimalPart = parts[1].slice(0, 4);
        setformattedBalance(parts[0] + "." + decimalPart);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("MetaMask is not installed");
    }
  };
  useEffect(() => {
    getWalletBalance();
  }, [getWalletBalance]);
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return (
    <div className="walletdetails">
      <h1>{formatter.format(walletBalance * conversionRate)}</h1>
      <h1>{formattedBalance} ETH</h1>
      <p>{shortenAddress(currentAccount)}</p>
    </div>
  );
};
const SendForm = () => {
  const {
    currentAccount,
    connectWallet,
    sendTransaction,
    isLoading,
    addressTo,
    amount,
    transactionDescription,
    receiverName,
    setaddressTo,
    setamount,
    setreceiverName,
  } = useContext(TransactionContext);

  const [isChecked, setIsChecked] = useState(false);

  let colRef = collection(db, "contact");

  const checkUsersCallback = useCallback(() => {
    if (user) {
      colRef = collection(db, `contact${user.uid}`);
    } else {
    }
  }, [colRef]);
  useEffect(() => {
    checkUsersCallback();
  }, [checkUsersCallback]);

  if (typeof amount !== "string") {
    setamount(amount.toString());
  } else {
    setamount(amount);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof amount !== "string") {
      setamount(amount.toString());
    } else {
      await setamount(amount);
    }

    if (!addressTo || !amount || !transactionDescription || !receiverName) {
      console.log("pls fill form");
    } else {
      if (user && isChecked) {
        addDoc(colRef, {
          name: receiverName,
          walletAddress: addressTo,
          createdAt: currentTime,
          severTimeCreated: serverTimestamp(),
        }).then(() => {
          console.log("add");
        });
      }
      setamount(amount.toString());
      sendTransaction();
    }
  };

  const [conversionRate, setConversionRate] = useState();
  const [usdValue, setUsdValue] = useState();
  const [Loading, setLoading] = useState(false);

  const [walletBalance, setwalletBalance] = useState("");
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) => {
        setConversionRate(data.ethereum.usd);
        setLoading(false);
      });
  }, []);
  ``;

  const [formattedBalance, setformattedBalance] = useState("");
  const getWalletBalance = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      try {
        const address = await web3.eth.getAccounts();
        const balanceWei = await web3.eth.getBalance(address[0]);
        const balanceEther = web3.utils.fromWei(balanceWei, "ether");
        await setwalletBalance(balanceEther);

        var parts = walletBalance.split(".");
        var decimalPart = parts[1].slice(0, 4);
        setformattedBalance(parts[0] + "." + decimalPart);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("MetaMask is not installed");
    }
  };
  useEffect(() => {
    getWalletBalance();
  }, [getWalletBalance]);
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  const [remainingbalance, setremainingbalance] = useState();
  const BalanceInUsd = walletBalance * conversionRate;
  const RemainingBalanceInUsd = BalanceInUsd - usdValue;
  return (
    <div className="sendform">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="priceconverter">
          converted price in USD <h1>{formatter.format(usdValue || 0)} </h1>
        </div>
        <div className="priceconverter">
          remaining balance price in USD{" "}
          <h1
            style={{ color: `${RemainingBalanceInUsd > 0 ? "green" : "red"}` }}
          >
            {formatter.format(RemainingBalanceInUsd || 0)}{" "}
          </h1>
        </div>
      </div>
      <div className="form">
        <input
          placeholder="Address To"
          name="addressTo"
          type="text"
          value={addressTo}
          onChange={(e) => {
            setaddressTo(e.target.value);
            console.log(addressTo);
          }}
        />
        <input
          placeholder={amount === 0 ? "Amount (ETH)" : `Amount (ETH)`}
          name="amount"
          type="number"
          value={amount}
          onChange={(e) => {
            setamount(e.target.value);
            if (amount !== 0) {
              setUsdValue(e.target.value * conversionRate);
              setremainingbalance(amount * conversionRate - usdValue);
            }
          }}
        />
        <input
          name="amount"
          type="number"
          placeholder={usdValue === 0 ? "Amount (USD)" : `Amount (USD)`}
          value={usdValue}
          onChange={(e) => {
            setUsdValue(e.target.value);
            if (usdValue !== 0) {
              setamount(e.target.value / conversionRate);
            }
          }}
        />
        <input
          placeholder="Enter receiverName"
          name="receiverName"
          type="text"
          value={receiverName}
          onChange={(e) => {
            setreceiverName(e.target.value);
          }}
        />
        {isLoading ? (
          <div
            style={{
              margin: "auto",
              color: "purple",
              paddingTop:"15px"
            }}
          >
            <CircularProgress size={200} thickness={1} />
          </div>
        ) : !currentAccount ? (
          <button type="button" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div>
            <label>Save this beneficiary</label>
            <input
              style={{ borderRadius: "5px" }}
              className="sendformcheckbox"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <button type="button" onClick={handleSubmit}>
              Send now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendForm;
