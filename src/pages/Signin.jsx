import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import Githubimg from "../components/imgs/githubimg.svg";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBfov3VF_pR4J-9-kypPWTRb4mCEsThGaA",
  authDomain: "contact-8a1b2.firebaseapp.com",
  projectId: "contact-8a1b2",
  storageBucket: "contact-8a1b2.appspot.com",
  messagingSenderId: "134623457144",
  appId: "1:134623457144:web:52b071dc99dec7d6ede28d",
  measurementId: "G-KCR7H2L9N5",
};
import "../components/LoginSignup.css";
import Googleicon from "../components/imgs/google.png";
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const user = auth.currentUser;

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in.");
        navigate("/send");
        console.log("failed navi");
      } else {
        console.log("User is not signed in.");
      }
    });
  }, [user]);

  const provider = new GoogleAuthProvider();
  const signinwithgoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        console.log("signed in");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const providerGithub = new GithubAuthProvider();

  const signinwithgithub = () => {
    signInWithPopup(auth, providerGithub)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };
  useEffect(() => {
    document.title = "Signin";
  }, []);
  return (
    <div className="signup">
      <button
        onClick={() => {
          signinwithgoogle();
        }}
        className="signinwithgoogle"
      >
        <img src={Googleicon} alt="" />
        sign in with google
      </button>
      <button
        onClick={() => {
          signinwithgithub();
        }}
        className="signinwithgoogle"
      >
        <img src={Githubimg} alt="" />
        sign in with github
      </button>
    </div>
  );
};

export default Signup;
