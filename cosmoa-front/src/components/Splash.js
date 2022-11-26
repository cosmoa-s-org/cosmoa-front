import React from "react";
import { Card, CardMedia } from "@mui/material";
import cosmoaFull from "../../src/images/cosmoa_full.png";
import { Link } from "react-router-dom";

function Splash() {
  return (
    <div
      style={{ width: "100vw", height: "120vh" }}
    >
      <img
        src={cosmoaFull}
        style={{ width: "inherit", height: "auto", marginTop: "0%"}}
      />
    </div>
  );
}

export default Splash;
