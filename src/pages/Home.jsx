import React, { useEffect } from "react";
import { TopSection } from "../components/Home/topSection/TopSection";
import Midsection from "../components/Home/midsection/Midsection";
import Footer from "../components/Home/footer/Footer";
const Home = () => {
  useEffect(() => {
    document.title = "Etherflow";
  }, []);
  return (
    <>
      <div style={{ padding: "0px 100px" }}>
        <TopSection />
        <Midsection />
      </div>
        <Footer />
    </>
  );
};

export default Home;
