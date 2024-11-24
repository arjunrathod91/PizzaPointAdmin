import React, { useContext, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMediaQuery } from "@mui/material";
import { Context } from "../../context/Context";
import "./Admin.css";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MenuPage({ setSection }) {
  const {
    allorders,
    setAllOrders,
    rightSec,
    setRIghtSec,
    itemInfo,
    setItemInfo,
  } = useContext(Context);
  const isMobile = useMediaQuery("(max-width:600px)");

  const [openForm, setOpenForm] = useState(false);
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]);

  const handleBtn = (item) => {
    setOpenForm(true);
    setItemInfo(item);
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          "https://pizzapointserver-1.onrender.com/allItems"
        );
        console.log(response.data);
        setAllItems(response.data);
      } catch (err) {
        console.error("Error fetching menu data:", err);
        console.log(err);
      }
    };

    fetchMenu();
  }, []);

  const deleteBtn=(itemId)=>{
    axios
      .delete("https://pizzapointserver-1.onrender.com/allItems", {
        data: { id:itemId }, // pass the order ID in the body
      })
      .then((response) => {
        console.log("Order deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  }

  const allCategories = [...new Set(allItems.map((item) => item.category))];
  return (
    <div className="editmenu">
      {isMobile ? (
        <div onClick={() => setRIghtSec(false)}>
          <ArrowBackIcon />
        </div>
      ) : (
        ""
      )}
      <div className="addnew">
        {" "}
        <button onClick={() => setOpenForm(true)}>Add New</button>
      </div>
      <div>
      </div>
      {allCategories.map((category, index) => (
        <div className="item-cont">
          <div style={{marginTop:'10px'}} item={category} key={index}>
            <strong>{category} - <span>Total Item: {allItems.filter((item) => item.category === category).length}</span></strong>
          </div>
          {allItems.filter((item) => item.category === category).map(
            (item, index) => (
              <div className="item-box">
                <div
                  item={item}
                  key={index}
                  style={{ display: "flex", gap: "40px" }}
                >
                  <div className="box-img">
                    <img src={item.img} />
                  </div>
                  <div className="box-detail">
                    <div>{item.name}</div>
                    <div>{item.ingridient.substring(0, 0)}</div>
                    <div>{item.price}</div>
                  </div>
                </div>
                <div className="box-btn">
                  <div className="edit" onClick={() => handleBtn(item)}>
                    Edit
                  </div>
                  <div className="delete" onClick={() => deleteBtn(item._id)}>
                    Delete
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ))}
      {/* {allItems.map((item, index) => (
        <div className="item-box">
          <div item={item} key={index} style={{ display: "flex", gap: "40px" }}>
            <div className="box-img">
              <img src={item.img} />
            </div>
            <div className="box-detail">
              <div>{item.name}</div>
              <div>{item.ingridient.substring(0, 0)}</div>
              <div>{item.price}</div>
            </div>
          </div>
          <div className="box-btn">
            <div className="edit" onClick={() => handleBtn(item)}>
              Edit
            </div>
            <div className="delete" onClick={""}>
              Delete
            </div>
          </div>
        </div>
      ))} */}
      <div className={openForm ? "overlay" : ""}>
        {openForm && <Form openForm={openForm} setOpenForm={setOpenForm} />}
      </div>
    </div>
  );
}

export default MenuPage;
