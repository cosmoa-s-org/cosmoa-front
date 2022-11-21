import React from "react";
import { Card, CardMedia } from "@mui/material";
import cosmoaFull from "../../src/images/cosmoa_full.png";
import { Link } from "react-router-dom";

function Splash() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#ffa07a" }}
    >
      <img
        src={cosmoaFull}
        style={{ width: "inherit", height: "auto", marginTop: "35%" }}
      />
    </div>
  );
}

export default Splash;
