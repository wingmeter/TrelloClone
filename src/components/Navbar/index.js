import React from "react";
import { Bookmark } from "@mui/icons-material";
import "./style.scss";

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <div className="login-link">
          <Bookmark />
          <h1>Trello Board</h1>
        </div>
        <div className="login-link"></div>
      </div>
    </nav>
  );
};

export default Navbar;
