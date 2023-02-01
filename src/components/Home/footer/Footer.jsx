import React from "react";
import "./Footer.css";
import Githubimg from "../../imgs/githubimg.svg";
import { Link } from "react-router-dom";
import Wave from "../../imgs/wave.svg";

const footer = () => {
  return (
    <div>
      <div className="footerwavewrapper">
        <div className="footerwave">
          <img src={Wave} alt="" />
        </div>
      </div>
      <footer>
        <div>  
          <div className="logo">
            <Link to="/" className="link">
              <div style={{ position: "relative" }}>
                Ether
                <span className="flow">
                  <span className="waveoverlay">flow</span>
                  <span className="wave">flow</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div class="col-md-4">
          <h5>Contact Us</h5>
          <p>Email: abrahamadinlewa@gmail.com</p>
          <p>Phone: +234 818 943 2013</p>
        </div>
        <div class="col-md-4">
          <h5>Links</h5>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/send">Send</Link>
            </li>
            <li>
              <Link to="/receive">Receive</Link>
            </li>
            <li>
              <Link to="/signin">Signin</Link>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Follow Us</h5>
          <ul class="social-icons">
            <li>
              <a href="https://github.com/AdinlewaAbraham" target="_blank">
                <i class="fab fa-twitter">
                  <img src={Githubimg} alt="" />
                </i>
              </a>
            </li>
          </ul>
          <p class="copyright">Copyright © 2021 Etherflow</p>
        </div>
      </footer>
    </div>
  );
};

export default footer;
