import React from "react";
import UserTable from "../components/UserTable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 h-screen flex flex-shrink justify-center items-center">
        <UserTable />
      </div>
      <Footer />
    </>
  );
};

export default Home;
