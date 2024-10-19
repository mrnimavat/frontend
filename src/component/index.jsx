import React from "react";
import image from "../images/image4.jpg";

function LandingFrameMessage() {
  const style = {
    margin: "auto",
    padding: "10% 55% 45% 15%",
    color: "white",
  };
  return (
    <div style={style}>
      <div style={{ "font-size": "30px" }}>Welcome to Home Page</div>

      <br />
    </div>
  );
}
function LandingFrame() {
  const style = {
    "background-image": `url(${image})`,
    "background-repeat": "no-repeat",
    "background-size": "cover",
    position: "absolute",
    height: "100%",
    width: "100%",
  };
  return (
    <div style={style}>
      <LandingFrameMessage />
    </div>
  );
}
function HomePage(props) {
  return (
    <div>
      <LandingFrame />
    </div>
  );
}
export default HomePage;
