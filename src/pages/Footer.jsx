import React from "react";
import COLORS from "../colors/COLORS";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: COLORS.MAIN,
        padding: "10px",
        textAlign: "center",
      }}
    >
      <p style={{ color: COLORS.TEXT1 }}>
        © {new Date().getFullYear()} Amit Segal
      </p>
    </div>
  );
};

export default Footer;
