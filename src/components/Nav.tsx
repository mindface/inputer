import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="nav-outer">
      <p>
        <Link className="link" to="/">
          home
        </Link>
      </p>
      <p>
        <Link className="link" to="/about">
          about
        </Link>
      </p>
      <p>
        <Link className="link" to="/info">
          info
        </Link>
      </p>
      <p>
        <Link className="link" to="/dictio">
          dictio
        </Link>
      </p>
    </div>
  );
}

export default Nav;
