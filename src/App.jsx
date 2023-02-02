import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import ErrorPage from "./pages/Error";
import Send from "./pages/Send";
import Signin from "./pages/Signin";
import Receive from "./pages/Receive";
function App() {
  return (
    
      <Router>
        <div style={{ marginBottom: "80px" }}>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/send" element={<Send />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
  );
}

export default App;
