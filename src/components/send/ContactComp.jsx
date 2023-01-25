import React, { useState, useEffect } from "react";
import UserIcon from "../imgs/user.svg";
import { motion, AnimatePresence } from "framer-motion";

const ContactComp = (p) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showShowMenu, setshowShowMenu] = useState(false);
  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.closest(".detectme") === null) {
        setShowDropdown(false);
      } else {
      }
      if (e.target.closest(".threedotcontainer") === null) {
        setshowShowMenu(false);
      } else {
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setShowDropdown]);

  return (
    <AnimatePresence>
      <div className="contactcard">
        <div className="contactspace">
          <div style={{ marginRight: "30px" }}>
            <img src={UserIcon} alt="" />
            <div>
              <p className="name">{p.name}</p>
              <p className="walletaddress">{`${p.WA.slice(0, 4)}...${p.WA.slice(-4)}`}</p>
              <p className="date">{p.DA}</p>
            </div>
          </div>

          <div
            className="dropdown"
            onClick={() => {
              setshowShowMenu(!showShowMenu);
            }}
          >
            <div
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
              className="dropdown-content"
              style={{ display: showShowMenu ? "block" : "none" }}
            >
              <a className="detectme">{p.edit}</a>
              <a>{p.delete}</a>
              <a>{p.send}</a>
            </div>
            <div class="threedotcontainer">
              <svg viewBox="0 0 16 16" class="dots">
                <circle cx="8" cy="4" r="2" />
                <circle cx="8" cy="8" r="2" />
                <circle cx="8" cy="12" r="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <div>{p.Editinput}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactComp;
