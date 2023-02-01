import React, { useContext, useState, useEffect, useCallback } from "react";
import "./Send.css";
import { Line } from "react-chartjs-2";
import Web3 from "web3";

import { TransactionContext } from "../../context/TransactionContext";

import { shortenAddress } from "../../utils/shortenAddress";
import CopyImg from "../imgs/copy-icon.svg";
import { async } from "@firebase/util";

export const Chart = () => {
  const [mappedData, setmappedData] = useState([]);
  const [account, setAccount] = useState("");
  const { transactions } = useContext(TransactionContext);
  useEffect(() => {
    const getAccount = async () => {
      if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        try {
          const address = await web3.eth.getAccounts();
          setAccount(address[0]);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("MetaMask is not installed");
      }
    };

    getAccount();
  }, []);

  useEffect(() => {
    if (account && transactions.length > 0) {
      const filteredTransactions = transactions.filter((transaction) => {
        return (
          transaction.addressFrom === account ||
          transaction.addressTo === account
        );
      });
      const mappedData = filteredTransactions.map((transaction) => {
        let timestamp = new Date(transaction.timestamp);
        let formattedTimestamp = timestamp.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        return {
          x: formattedTimestamp,
          y:
            transaction.amount * (transaction.addressFrom === account ? -1 : 1), // multiply by -1 if the transaction is from the current account
          type: transaction.addressFrom === account ? "sent" : "received",
        };
      });
      setmappedData(mappedData);
    }
  }, [account, transactions]);
  return (
    <div className="walletchart">
      <Line
        data={{
          labels: mappedData.map((data) => data.x),
          datasets: [
            {
              label: "Transaction History",
              data: mappedData.map((data) => data.y),
              backgroundColor: mappedData.map((data) =>
                data.type === "sent"
                  ? "rgba(255, 99, 132, 0.2)"
                  : "rgba(54, 162, 235, 0.2)"
              ),
              borderColor: mappedData.map((data) =>
                data.y >= 0 ? "green" : "red"
              ),
              pointBackgroundColor: mappedData.map((data) =>
                data.y >= 0 ? "green" : "red"
              ),
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: mappedData.map((data) =>
                data.y >= 0 ? "green" : "red"
              ),
              pointRadius: false,
              tension: 0.4,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            // 'legend' now within object 'plugins {}'
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              ticks: {
                // display: false,
                color: "grey",
                font: {
                  size: 10, // 'size' now within object 'font {}'
                },
                stepSize: 1,
                begineAtZero: true,
              },
            },
            x: {
              // not 'xAxes: [{' anymore (not an array anymore)
              ticks: {
                // display: false,
                color: "grey", // not 'fontColor:' anymore
                //fontSize: 14,
                font: {
                  size: 10, // 'size' now within object 'font {}'
                },
                stepSize: 1,
                beginAtZero: true,
              },
            },
          },
        }}
      />
    </div>
  );
};

const TransactionsHistory = () => {
  const [account, setAccount] = useState("");
  const { transactions, currentAccount } = useContext(TransactionContext);

  useEffect(() => {
    const getAccount = async () => {
      if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        try {
          const address = await web3.eth.getAccounts();
          setAccount(address[0]);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("MetaMask is not installed");
      }
    };

    getAccount();
  }, []);
  const filteredTransactions = transactions.filter((transaction) => {
    return (
      transaction.addressFrom === account || transaction.addressTo === account
    );
  });
  const mappedData = filteredTransactions.map((transaction) => {
    let timestamp = new Date(transaction.timestamp);
    return {
      ...transaction,
      type: transaction.addressFrom === account ? "sent" : "received",
    };
  });
  const [sortType, setSortType] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const sortedMappedData = mappedData.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    if (sortType === "date") {
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortType === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
  });

  const [conversionRate, setConversionRate] = useState();
  const [Loading, setLoading] = useState(false);
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
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return (
    <div className="transactions">
      <div
        className="transactionsover"
        style={{
          overflowY:
            Object.keys(sortedMappedData).length <= 10 ? "hidden" : "scroll",
        }}
      >
        {!currentAccount ? (
          <h1 className="connectWallet">
            Connect your account to see your transactions History
          </h1>
        ) : (
          <div>
            {sortedMappedData.length === 0 ? (
              <div className="notransactions">
                <h1>You currently have no transactions.</h1>
              </div>
            ) : (
              <table className="transactiontable">
                <thead>
                  <tr>
                    <th>
                      <div>From</div>{" "}
                    </th>
                    <th>To</th>
                    <th>Type</th>

                    <th>
                      <div className="th">
                        Amount (ETH){" "}
                        <div className="thcoloum">
                          <span
                            style={{
                              color:
                                sortType == "amount" && sortOrder == "asc"
                                  ? "#5f22d9 "
                                  : "white",
                            }}
                            onClick={() => {
                              setSortType("amount");
                              setSortOrder("asc");
                            }}
                          >
                            &#x25B2;
                          </span>{" "}
                          <span
                            style={{
                              color:
                                sortType == "amount" && sortOrder == "desc"
                                  ? "#5f22d9 "
                                  : "white",
                            }}
                            onClick={() => {
                              setSortType("amount");
                              setSortOrder("desc");
                            }}
                          >
                            &#x25BC;
                          </span>
                        </div>
                      </div>
                    </th>
                    <th>Amount(USD)</th>
                    <th>
                      <div className="th">
                        Date{" "}
                        <div className="thcoloum">
                          <span
                            style={{
                              color:
                                sortType == "date" && sortOrder == "asc"
                                  ? "#5f22d9 "
                                  : "white",
                            }}
                            onClick={() => {
                              setSortType("date");
                              setSortOrder("asc");
                            }}
                          >
                            &#x25B2;
                          </span>{" "}
                          <span
                            style={{
                              color:
                                sortType == "date" && sortOrder !== "asc"
                                  ? "#5f22d9 "
                                  : "white",
                            }}
                            onClick={() => {
                              setSortType("date");
                              setSortOrder("desc");
                            }}
                          >
                            &#x25BC;
                          </span>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="transactionrowhover">
                  {sortedMappedData.map((transaction) => (
                    <tr key={transaction.timestamp} className="transactionrow">
                      <td className="address">
                        <div className="addressfirst">
                          <img
                            src={CopyImg}
                            alt=""
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(
                                  transaction.addressFrom
                                );
                                console.log("Text copied to clipboard");
                              } catch (err) {
                                console.error("Failed to copy text: ", err);
                              }
                            }}
                          />
                          <a
                            href={`https://goerli.etherscan.io/address/${transaction.addressFrom}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {shortenAddress(transaction.addressFrom)}
                          </a>
                        </div>
                      </td>
                      <td className="address">
                        <div className="addressfirst">
                          <img
                            src={CopyImg}
                            alt=""
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(
                                  transaction.addressTo
                                );
                                console.log("Text copied to clipboard");
                              } catch (err) {
                                console.error("Failed to copy text: ", err);
                              }
                            }}
                          />
                          <a
                            href={`https://goerli.etherscan.io/address/${transaction.addressTo}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {shortenAddress(transaction.addressTo)}
                          </a>
                        </div>
                      </td>
                      <td>
                        {transaction.type === "sent" ? (
                          <div className="red">sent</div>
                        ) : (
                          <div className="green">Receive</div>
                        )}
                      </td>
                      <td
                        style={{
                          color: `${
                            transaction.type === "sent" ? "red" : "green"
                          }`,
                        }}
                      >
                        {`${transaction.type === "sent" ? "-" : "+"}`}
                        {transaction.amount}
                      </td>
                      <td
                        style={{
                          color: `${
                            transaction.type === "sent" ? "red" : "green"
                          }`,
                        }}
                      >
                        {`${transaction.type === "sent" ? "-" : "+"}`}
                        {formatter.format(transaction.amount * conversionRate)}
                      </td>
                      <td>{transaction.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsHistory;
