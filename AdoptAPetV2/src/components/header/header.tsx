import React from "react";
import ReactDOM from "react-dom/client";

import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="image">
        <div className="blur">
          <h1 className="title"> Adopt a Pet </h1>
          <p className="subtitle"> Find your new best friend, adopt today! </p>
        </div>
      </div>
    </div>
  );
}
