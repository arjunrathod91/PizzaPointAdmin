import React, { useContext, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMediaQuery } from "@mui/material";
import { Context } from "../../context/Context";
import "./Admin.css";
import Form from "./Form";
import { useNavigate } from "react-router-dom";

function MenuPage({setSection}) {
  const { allorders, setAllOrders, rightSec, setRIghtSec } =
    useContext(Context);
  const isMobile = useMediaQuery("(max-width:600px)");

  const [openForm,setOpenForm] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="editmenu">
      {isMobile ? (
        <div onClick={() => setRIghtSec(false)}>
          <ArrowBackIcon />
        </div>
      ) : (
        ""
      )}
      <div className="addnew"> <button onClick={()=>setSection('Form')}>Add New</button></div>
      <div>Pizza</div>
      <div className="item-box">
        <div style={{display:'flex',gap:'40px'}}>
        <div className="box-img">
          <img src="https://b.zmtcdn.com/data/dish_photos/5a2/071b2a42ef343a52f8a22f960287d5a2.png?fit=around|130:130&crop=130:130;*,*"/>
        </div>
        <div className="box-detail">
          <div>Chicken Pizza</div>
          <div>Tomato Onion Capcicum</div>
          <div>$230</div>
        </div>
        </div>
        <div className="box-btn">
          <div className="edit" onClick={()=>setOpenForm(true)}>Edit</div>
          <div className="delete" onClick={''}>Delete</div>
        </div>
      </div>
      <div className={openForm ? "overlay" : ""}>
      {openForm && <Form openForm={openForm} setOpenForm={setOpenForm}/>}
      </div>
    </div>
  );
}

export default MenuPage;
