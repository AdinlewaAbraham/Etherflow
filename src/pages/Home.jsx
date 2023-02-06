import React, { useEffect } from "react";
import { TopSection } from "../components/Home/topSection/TopSection";
import Midsection from "../components/Home/midsection/Midsection";
import Footer from "../components/Home/footer/Footer";
import "../components/Home/topSection/TopSection.css"
const Home = () => {
  useEffect(() => {
    document.title = "Etherflow";
  }, []);
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <div className="homebody">
        <TopSection />
        <Midsection />
      </div>
      <Footer />
    </>
  );
};

export default Home;
