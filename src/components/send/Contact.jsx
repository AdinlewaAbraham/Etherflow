import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  serverTimestamp,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useContext, useState, useCallback, useEffect } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import ContactComp from "./ContactComp";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sortimg from "../imgs/sort.svg";
import "./Send.css";
import Addcontacct from "../imgs/addcontact.svg";
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
let colRef = collection(db, "contact");
const Contact = () => {
  const [contacts, setcontacts] = useState([]);
  const [name, setname] = useState("");
  const [walletaddress, setwalletaddress] = useState("");
  const [orderby, setorderby] = useState("name");
  const [orderbytype, setorderbytype] = useState("asc");

  const [editinputname, seteditinputname] = useState("");
  const [editinputwalletaddress, seteditinputwalletaddress] = useState("");
  const [isUserSignedIn, setisUserSignedIn] = useState(false);
  const [isContactEmpty, setisContactEmpty] = useState(false);

  const [showAddContactForm, setshowAddContactForm] = useState(false);
  const [showsort, setshowsort] = useState(false);

  const getUserStatteCallback = useCallback(async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user sined in");
        setisUserSignedIn(true);
        colRef = collection(db, `contact${user.uid}`);
      } else {
        console.log("user sined out");
        setisUserSignedIn(false);
      }
    });
  }, [user, isUserSignedIn]);
  useEffect(() => {
    getUserStatteCallback();
  }, [getUserStatteCallback]);
  const [searchQuery, setSearchQuery] = useState("");
  const getUsersCallback = useCallback(async () => {
    if (isUserSignedIn) {
      //colRef = collection(db, `contact${user.uid}`);
      const q =
        searchQuery === ""
          ? query(colRef, orderBy(orderby, orderbytype))
          : query(
              colRef,
              where("name", ">=", searchQuery),
              orderBy("name", orderbytype)
            );
      const data = await getDocs(q);
      setcontacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    if (contacts.length === 0) {
      console.log("loading");
    } else {
      console.log("contacts avail");
    }
  }, [colRef, isUserSignedIn, searchQuery, orderby, orderbytype]);

  useEffect(() => {
    getUsersCallback();
  }, [getUsersCallback]);
  if (contacts) {
    console.log("please add contact");
  }
  //adding contact
  const currentTime = new Date().toLocaleString();
  const addContactForm = async (e) => {
    e.preventDefault();
    const user = await auth.currentUser;
    await getUserStatteCallback();
    if (isUserSignedIn) {
      console.log(user);
      colRef = await collection(db, `contact${user.uid}`);
      addDoc(colRef, {
        name: name,
        walletAddress: walletaddress,
        createdAt: currentTime,
        severTimeCreated: serverTimestamp(),
      }).then(() => {
        setname("");
        setwalletaddress("");
      });
    }
  };
  const handleDelete = (e) => {
    console.log("works");
    console.log(e.target.id);

    deleteContactForm(e.target.id);
  };

  //deleting Contact
  const deleteContactForm = async (id) => {
    if (isUserSignedIn) {
      const user = await auth.currentUser;
      const docRef = doc(db, `contact${user.uid}`, id);
      getUsersCallback();
      deleteDoc(docRef).then(() => {
        //setid("");
      });
    }
  };
  const handleEdit = (e) => {
    seteditinputname(e.target.id);
    seteditinputwalletaddress(e.target.name);
  };
  const handleUpdate = async (e) => {
    if (isUserSignedIn) {
      const user = await auth.currentUser;
      const docRef = doc(db, `contact${user.uid}`, e.target.id);
      getUsersCallback();
      updateDoc(docRef, {
        name: editinputname,
        walletAddress: editinputwalletaddress,
      }).then(() => {
        seteditinputname("");
        seteditinputwalletaddress("");
      });
    }
  };

  const handleChange = (event) => {
    setorderbytype(event.target.value);
  };

  const handleChangee = (event) => {
    setorderby(event.target.value);
  };
  const { setaddressTo, setreceiverName } = useContext(TransactionContext);
  const handleTransaction = (e) => {
    setaddressTo(e.target.name);
    setreceiverName(e.target.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <div className="contact">
        {!isUserSignedIn ? (
          <div className="notsignedin">
            <div>
              <h1>
                To access this feature, please create an account or sign in to
                your existing account.
              </h1>
              <div>
                <button
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="navbar">
              <form class="nosubmit">
                <input
                  class="nosubmit"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="search"
                  placeholder="Search..."
                />
              </form>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  onClick={() => {
                    setshowsort(!showsort);
                  }}
                >
                  <img className="sortimg" src={Sortimg} alt="" />
                </div>
                <div
                  className={`add ${showAddContactForm ? "rotate" : ""}`}
                  onClick={() => {
                    setshowAddContactForm(!showAddContactForm);
                  }}
                >
                  +
                </div>
              </div>
            </div>
            {showAddContactForm && (
              <form onSubmit={addContactForm} action="">
                <motion.div
                  className="addcontact"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    placeholder="enter name"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    type="text"
                    value={name}
                  />
                  <input
                    placeholder="enter wallet address"
                    onChange={(e) => {
                      setwalletaddress(e.target.value);
                    }}
                    type="text"
                    value={walletaddress}
                  />

                  <button>Add contact</button>
                </motion.div>
              </form>
            )}

            {showsort && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="sortdiv"
              >
                <label>
                  Order:
                  <select
                    style={{ color: "black" }}
                    value={orderbytype}
                    onChange={handleChange}
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </label>
                <label>
                  Sort By:
                  <select
                    style={{ color: "black" }}
                    value={orderby}
                    onChange={handleChangee}
                  >
                    <option value="name">Name</option>
                    <option value="createdAt">Date Added</option>
                  </select>
                </label>
              </motion.div>
            )}
            <div className="contactlist" style={{ overflowY: Object.keys(contacts).length <= 5 ? 'hidden' : 'scroll' }}>
              {Object.keys(contacts).length === 0 && (
                <div className="nocontactmessage">
                  <img src={Addcontacct} alt="" />
                  <p>It seems that you do not have any saved contacts.</p>
                  <button
                    onClick={() => {
                      setshowAddContactForm(!showAddContactForm);
                    }}
                  >
                    add
                  </button>
                </div>
              )}
              {contacts.map(({ name, id, walletAddress, createdAt }) => (
                <ContactComp
                  name={name}
                  WA={walletAddress}
                  DA={createdAt}
                  id={id}
                  edit={
                    <button
                      className="button"
                      id={name}
                      name={walletAddress}
                      onClick={handleEdit}
                    >
                      edit
                    </button>
                  }
                  delete={
                    <button className="button" id={id} onClick={handleDelete}>
                      delete
                    </button>
                  }
                  send={
                    <button
                      className="button"
                      id={name}
                      name={walletAddress}
                      onClick={handleTransaction}
                    >
                      make transaction
                    </button>
                  }
                  Editinput={
                    <div className="editdropdown">
                      <input
                        placeholder="name"
                        minLength="10"
                        maxLength="30"
                        type="text"
                        onChange={(e) => seteditinputname(e.target.value)}
                        value={editinputname}
                      />
                      <input
                        placeholder="address"
                        type="text"
                        onChange={(e) =>
                          seteditinputwalletaddress(e.target.value)
                        }
                        value={editinputwalletaddress}
                      />
                      <button id={id} name={name} onClick={handleUpdate}>
                        update
                      </button>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default Contact;
