import React from "react";
import spinner from "./spinner.gif";
import "./Loading.css";

export default function Loading() {
  console.log("loading...");

  return (
    <div className="loading-picture">
      <img
        src={spinner}
        alt="loading_picture"
        height="200px"
        width="200px"
      ></img>
    </div>
  );
}
