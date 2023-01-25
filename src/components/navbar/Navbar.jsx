import React from "react";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import NoUserPic from "../imgs/nouserpic.png";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser;
const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isuser, setisuser] = useState(false);

  const getUserStatteCallback = useCallback(async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user sined in");
        setisuser(true);
      } else {
        console.log("user sined out");
        setisuser(false);
      }
    });
  }, [user, isuser]);
  useEffect(() => {
    getUserStatteCallback();
  }, [getUserStatteCallback]);

  return (
    <nav>
      <div>
        <div className=".link">
          <h1>
            {" "}
            <Link to="/">
              Ether<span className="flow">flow</span>
            </Link>
          </h1>
        </div>
      </div>
      <div className="navflex">
        <div className=".link">
          <Link to="/send">Send</Link>
        </div>
        <div className=".link">
          <Link to="/receive">Receive</Link>
        </div>
        {isuser && (
          <div className="navrow">
            <img
              src={NoUserPic}
              alt="User Profile Picture"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="dropdown">
                <button
                  onClick={() => {
                    auth
                      .signOut()
                      .then(() => {
                        console.log("signed out");
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        {!isuser && (
          <div className=".link">
            <Link to="/signin">Signin</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
