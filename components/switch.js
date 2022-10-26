import React, { useContext } from "react";
import { Context } from "../context";

export default function Switch() {
  const { showDarkMode, setShowDarkMode } = useContext(Context);

  return (
    <div className="">
      <div
        className={`switch-container ${
          showDarkMode ? "switch-dark" : "switch-light"
        }`}
        onClick={() => setShowDarkMode(!showDarkMode)}
      >
        <span className="switch-button"></span>
      </div>
    </div>
  );
}
