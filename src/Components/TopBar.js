import React from "react";

import Navbar from "../Components/Navbar";

const TopBar = ({ name, link, backlink, backname }) => {
  return (
    <>
      <div className="Topbarcover"></div>
      <div className="Topbar">
        <Navbar />
        <h1>{name}</h1>
        <div className="linksTb">
          Department of Computer Science
        </div>
      </div>
    </>
  );
};

export default TopBar;
