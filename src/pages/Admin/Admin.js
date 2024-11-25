import React, { useContext, useEffect, useState } from "react";
import "../Profile/profile.css";
import OrdersPage from "./ordersPage";
import Menu from "./menuPage";
import {
  AddAPhoto,
  Height,
  LocalShipping,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { useMediaQuery } from "@mui/material";
import Form from "./Form";
import Analytics from "./Analytics";
function Profile() {
  const [section, setSection] = useState("Orders");
  const { loggedIn, setLoggedIn, rightSec, setRIghtSec } = useContext(Context);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [zIndexLeft, setZiNdexLeft] = useState("1");
  const [locator,setLocator] = useState('rgb(255, 202, 202)')
  const [zIndexRight, setZiNdexRight] = useState("2");
  const [width, setWidth] = useState("100%");
  const [position, setPosition] = useState("absolute");
  const renderSection = () => {
    switch (section) {
      case "Orders":
        return <OrdersPage />;
      case "Menu":
        return <Menu setSection={setSection} locator={locator} />;
      // case "Form":
      //   return <Form setSection={setSection} renderSection={renderSection} />;
      case "Analytics":
        return <Analytics locator={locator} />;
    }
  };

  const navigate = useNavigate();
  const login = () => {
    setLoggedIn(true);
  };

  const responsiveCtr = () => {
    if (isMobile) {
      setZiNdexLeft("1");
      setZiNdexRight("2");
    }
  };
  useEffect(() => {
    if (!loggedIn) {
      navigate("/adminlogin");
    }
  });
  return (
    <div className="profile">
      <div
        className="left"
        style={{
          backgroundColor: "white",
          width: `${width}`,
          zIndex: `${rightSec ? "1" : "2"}`,
          position: `${isMobile ? position : "relative"}`,
          top: `${isMobile ? "50px" : "0px"}`,
        }}
      >
        <div className="">
          <DashboardIcon />
          <span>Dashboard</span>
        </div>
        <div
          className="pro-sec"
          style={{backgroundColor:`${section == "Orders" ? locator : ''}`}}
          onClick={() => {
            setSection("Orders");
            responsiveCtr();
            setRIghtSec(true);
          }}
        >
          <ShoppingCart />
          <span>Orders</span>
        </div>
        <div
          className="pro-sec"
          style={{backgroundColor:`${section == "Menu" ? locator : ''}`}}
          onClick={() => {
            setSection("Menu");
            responsiveCtr();
            setRIghtSec(true);
          }}
        >
          <AddAPhoto />
          <span>Add Menu</span>
        </div>
        <div
          className="pro-sec"
          style={{backgroundColor:`${section == "Analytics" ? locator : ''}`}}
          onClick={() => {
            setSection("Analytics");
            responsiveCtr();
            setRIghtSec(true);
          }}
        >
          <LeaderboardIcon />
          <span>Analytics</span>
        </div>
      </div>
      <div
        className="right"
        style={{ width: `${width}`, zIndex: `${rightSec ? "2" : "1"}` }}
      >
        {renderSection()}
      </div>
    </div>
  );
}

export default Profile;
