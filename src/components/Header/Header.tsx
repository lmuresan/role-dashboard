import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

const Header: FunctionComponent = () => {
  return (
    <>
      <div className="header fixed-top">
        <div className="header__logo">
          <Link to="/">Role Dashboard App</Link>
        </div>
      </div>
    </>
  );
};

export default Header;
