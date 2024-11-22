import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form({ renderSection, setSection }) {
  const navigate = useNavigate();
  return (
    <div className="form">
      <div>Submit Form</div>
      <div className="all-elements">
        {/* name: 'Crinkle French Fries',
    ingridient: 'Crispy and golden French fries with a crunch. A popular side dish, perfect for snacking.',
    rating: 4.4,
    price: '119',
    img: 'https://b.zmtcdn.com/data/dish_photos/5a2/071b2a42ef343a52f8a22f960287d5a2.png?fit=around|130:130&crop=130:130;*,*',
    category:'fries',
    type:'non-veg',
    tag:'french fries' */}
        <div className="form-item">
          <div>Name</div>
          <div className="form-input">Crinkle French Fries</div>
        </div>
        <div className="form-item">
          <div>Ingridient</div>
          <div className="form-input">
            <textarea>
              Crispy and golden French fries with a crunch. A popular side dish,
              perfect for snacking.
            </textarea>
          </div>
        </div>
        <div className="form-item">
          <div>Rating</div>
          <div className="form-input">4.4</div>
        </div>
        <div className="form-item">
          <div>Price</div>
          <div className="form-input">$119</div>
        </div>
        <div className="form-item">
          <div>category</div>
          <div className="form-input">Fries</div>
        </div>
        <div className="form-item">
          <div>Type</div>
          <div className="form-input">Veg</div>
        </div>
        <div style={{ display: "flex", gap: "20px",justifyContent:'center',alignItems:'center' }}>
          <div>Save</div>
          <div onClick={() => setSection("Menu")}>Cancel</div>
        </div>
      </div>
      {/* <div onClick={()=>setSection('Menu')}>cancel</div> */}
    </div>
  );
}

export default Form;
