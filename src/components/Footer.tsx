import React from "react";
import Linkedin from "../assets/linkedin.svg";
import Twit from "../assets/x.svg";
import Github from "../assets/github.svg";
import Instagram from "../assets/instagram.svg";

const Footer: React.FC = () => {
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:w-screen md:px-24 lg:px-8">
      <div className="flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row">
        <p className="text-sm text-gray-700 p-2">
          © Copyright 2024 All rights reserved.
        </p>
        <div className="flex items-center mt-4 space-x-4 sm:mt-0 p-2">
          <a href="#">
            <img className="h-7 w-7" src={Twit} alt="Twitter" />
          </a>
          <a href="#">
            <img className="h-7 w-7" src={Linkedin} alt="LinkedIn" />
          </a>
          <a href="#">
            <img className="h-7 w-7" src={Github} alt="GitHub" />
          </a>
          <a href="#">
            <img className="h-7 w-7" src={Instagram} alt="Instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
