import React from "react";
import "./Midsection.css";
import SecureImg from "../../imgs/security.svg";
import ReliabilityImg from "../../imgs/Reliability.png";
import fastIcon from "../../imgs/clock.png";
import bene from "../../imgs/addfriend.png";
import chartimg from "../../imgs/linechart.png";
import etherflowimg from "../../imgs/aboutetherflowimg.png";

const GlowDiv = (p) => {
  return (
    <div className="glowDiv">
      <div className="glowDivImgDiv">
        <img className="glowDivImg" src={p.img} alt="" />
      </div>
      <div>
        <h4>{p.header}</h4>
        <p>{p.desc}</p>
      </div>
    </div>
  );
};

const Midsection = () => {
  return (
    <div>
      <div className="aboutetherflow">
        <img src={etherflowimg} alt="" />
        <div>
          <h1>
            About <span style={{textTransform: "uppercase"}}> Ether<span className="flow">flow</span></span>
          </h1>
          <p>
            Etherflow is a decentralized application that simplifies the use of
            Ethereum for digital transactions, including a beneficiary system
            for easier recurring payments. Our user-friendly interface makes it
            easy for anyone to participate in the decentralized economy.
            <br />
            <br />
            We also provide a visual representation of transaction history data,
            allowing users to understand and track their transaction history
            easily. Etherflow ensures fast, secure, and reliable transactions
            thanks to the decentralized nature of the Ethereum blockchain. Our
            ultimate goal is to make the use of Ethereum more accessible to
            everyone.
          </p>
          <button>Get Started</button>
        </div>
      </div>
      <div>
        <h1 className="headerMid">
          Easily and quickly transfer money to anyone
        </h1>
        <div className="glowDivMain">
          <GlowDiv
            img={fastIcon}
            header="Fast"
            desc="Speedy crypto transfer with our platform."
          />
          <GlowDiv
            img={SecureImg}
            header="Secure"
            desc="Secure crypto transfer with Metamask pairing."
          />
          <GlowDiv
            img={ReliabilityImg}
            header="Reliable"
            desc="Dependable crypto transfer with our platform."
          />
        </div>
      </div>
      <div className="addbendiv">
        <div className="addbendivdesc">
          <h1>Simplifying Transactions with our Beneficiary System</h1>
          <p>
            Our dapp streamlines the transaction process by eliminating the need
            for constantly copying and pasting hexadecimal addresses. With our
            beneficiary system, users can easily save and manage their preferred
            addresses, making recurring transactions faster and more convenient.
            Say goodbye to the tedious task of manual address input, and hello
            to a more efficient and user-friendly experience.
          </p>
        </div>
        <div>
          <img className="purplefilter" src={bene} alt="" />
        </div>
      </div>
      <div className="addbendiv">
        <img className="purplefilterchart" src={chartimg} alt="" />
        <div className="addbendivdesc">
          <h1>Explore Your Transactions with Ease</h1>
          <p>
            Our decentralized application is designed to provide users with a
            seamless experience of tracking their transaction history on the
            blockchain. With our user-friendly interface and real-time updates,
            you will have a clear understanding of all your digital assets,
            making it easy to manage and track them. Our DApp is not only secure
            but also reliable, providing you with the peace of mind you need to
            take control of your financial future. Try it out now and experience
            the convenience of visualizing your transaction history, in a way
            that you have never seen before.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Midsection;
