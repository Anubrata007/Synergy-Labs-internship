import React from "react";
import UserTable from "../components/UserTable";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4 h-screen flex justify-center items-center">
      <UserTable />
    </div>
  );
};

export default Home;
