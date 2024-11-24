import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form({ setOpenForm }) {
  const navigate = useNavigate();
  return (
    <div className="form">
      <div style={{fontWeight:500}}>Edit Item</div>
      <div className="all-elements">
        <div className="form-item">
          <div>Name</div>
          <input className="form-input" value="Crinkle French Fries" />
        </div>
        <div className="form-item">
          <div>Ingridient</div>
          <input className="form-input" value="Crispy and golden French fries with a crunch. A popular side dish,
            perfect for snacking." />
        </div>
        <div className="form-item">
          <div>Rating</div>
          <input className="form-input" value="4.4" />
        </div>
        <div className="form-item">
          <div>Price</div>
          <input className="form-input" value="$119" />
        </div>
        <div className="form-item">
          <div>category</div>
          <input className="form-input" value="Fries" />
        </div>
        <div className="form-item">
          <div>Type</div>
          <input className="form-input" value={"Veg"} />
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="save">Save</div>
          <div className="cancel" onClick={() => setOpenForm(false)}>
            Cancel
          </div>
          {/* <div onClick={() => setSection("Menu")}>Cancel</div> */}
        </div>
      </div>
    </div>
  );
}

export default Form;
