import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

function Form({ setOpenForm,formMode,setFormMode}) {
  const { allorders, setAllOrders, rightSec, setRIghtSec,itemInfo,setItemInfo } =
    useContext(Context);
  const navigate = useNavigate();

  const [name,setName] = useState('');
  const [ingridient,setIngridient] = useState('');
  const [rating,setRating] = useState('');
  const [price,setPrice] = useState('');
  const [category,setCategory] = useState('');
  const [type,setType] = useState('');
  const [img,setImg] = useState('');

  const handleBtn=async(itemId)=>{
    const itemUpdate = {
      name:name == "" ? itemInfo.name : name,
      ingridient:ingridient == "" ? itemInfo.ingridient : ingridient,
      rating:rating == "" ? itemInfo.rating : rating,
      price:price == "" ? itemInfo.price : price,
      category:category == "" ? itemInfo.category : category,
      type:type == "" ? itemInfo.type : type,
      img:img == "" ? itemInfo.img : img
    }
    setOpenForm(false);
    if(formMode == "edit"){
      try {
        const response1 = await axios.put(
          `https://pizzapointserver-1.onrender.com/allItems/${itemId}`,
          itemUpdate
        );
        console.log("Item updated successfully:", response1.data);
        alert('Item Updated successfully');
        setOpenForm(false);
      } catch (error) {
        console.log(error);
      }
    }
    else{
      alert('Item added successfully')
      console.log(itemUpdate);
      try {
        const response = await axios.post(
          "https://pizzapointserver-1.onrender.com/allItems",
          itemUpdate
        );
        // console.log("the data of user sent successfully:", response.data);
      } catch (error) {
        console.log(error);
      }
      // console.log(formMode);

    }
  }

  return (
    <div className="form">
      <div style={{fontWeight:500}}>Edit Item</div>
      <div className="all-elements">
        <div className="form-item">
          <div>Name</div>
          <input className="form-input" placeholder={itemInfo.name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="form-item">
          <div>Ingridient</div>
          <input className="form-input"  placeholder={itemInfo.ingridient} onChange={(e)=>setIngridient(e.target.value)} />
        </div>
        <div className="form-item">
          <div>Img</div>
          <input className="form-input" onChange={(e)=>setImg(e.target.value)} /> <img style={{height:'40px',width:'40px'}} src={img ? img : itemInfo.img}/>
        </div>
        <div className="form-item">
          <div>Rating</div>
          <input className="form-input" placeholder={itemInfo.rating} onChange={(e)=>setRating(e.target.value)} />
        </div>
        <div className="form-item">
          <div>Price</div>
          <input className="form-input" placeholder={itemInfo.price} onChange={(e)=>setPrice(e.target.value)}  />
        </div>
        <div className="form-item">
          <div>category</div>
          <input className="form-input" placeholder={itemInfo.category} onChange={(e)=>setCategory(e.target.value)}  />
        </div>
        <div className="form-item">
          <div>Type</div>
          <input className="form-input" placeholder={itemInfo.type} onChange={(e)=>setType(e.target.value)}  />
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="save" onClick={() => handleBtn(itemInfo._id)}>Save</div>
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
