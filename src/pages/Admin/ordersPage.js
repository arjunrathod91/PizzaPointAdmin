import { useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Context } from "../../context/Context";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./Admin.css";
import axios from "axios";
import phonecall from '../../Images/phonecall.mp3'

function OrdersPage({ locator }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { allorders, setAllOrders, setRIghtSec } =
    useContext(Context);

  // const obj = JSON.parse(localStorage.getItem("newOrder")) || [];
  const press = () => {
    setRIghtSec(false);
  };

  // const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [newOrders, setNewOrders] = useState(null);
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  // const [, setLoading] = useState(true);

  const playsound = () => {
    const audio = new Audio(phonecall); // Path to your sound file
    audio.play(); // Play the sound
  }

  const newOrder = () => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:8000/newOrder"
          "https://pizzapointserver.onrender.com/newOrder"
        );
        setNewOrders(response.data[response.data.length - 1]);
        setNewOrderCount(response.data.length);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };
    fetch();
  };

  // const latestOrder = useCallback(async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://pizzapointserver.onrender.com/allOrders"
  //     );
  //     setAllOrders(response.data.reverse());
  //   } catch (err) {
  //     console.error("Error fetching data:", err.message);
  //   }
  // }, [setAllOrders]);

  const accept = async () => {
    try {
      const response = await axios.post(
        // "http://localhost:8000/allOrders",
        "https://pizzapointserver.onrender.com/allOrders",
        newOrders
      );

      console.log("Order saved:", response.data);

      await axios.delete(
        // `http://localhost:8000/newOrder/${newOrders._id}`
        `https://pizzapointserver.onrender.com/newOrder/${newOrders._id}`
      );

      console.log("Order removed from newOrders");

      setNewOrders(null);

      const allOrdersResponse = await axios.get(
        "https://pizzapointserver.onrender.com/allOrders"
      );

      setAllOrders(allOrdersResponse.data.reverse());

    } catch (error) {
      console.error("Error in accept:", error);
    }
  };
  const cancel = () => {
    console.log(newOrders._id);

    axios
      // .delete(`http://localhost:8000/newOrder/${newOrders._id}`)
      .delete(`https://pizzapointserver.onrender.com/newOrder/${newOrders._id}`)
      .then((response) => {
        console.log("Order deleted:", response.data);
        setNewOrders(null);
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  const showUserDetails = (userId) => {
    setSelectedUser((prev) => (prev === userId ? null : userId));
  }

  useEffect(() => {
    const fetchLatestOrders = async () => {
      try {
        const response = await axios.get(
          "https://pizzapointserver.onrender.com/allOrders"
        );
        setAllOrders(response.data.reverse());
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchLatestOrders();
  }, [setAllOrders]);

  useEffect(() => {
    // async function fetchData() {
    //   setLoading(true); // Start loading
    //   await newOrder(); // Fetch your data
    //   await latestOrder();
    //   setLoading(false); // Stop loading
    // }
    newOrder();
    // latestOrder();
  }, [setAllOrders]);


  //   useEffect(() => {
  //   async function fetchData() {
  //     setLoading(true);

  //     const res1 = await axios.get("/newOrder");
  //     const res2 = await axios.get("/allOrders");

  //     setNewOrders(res1.data);
  //     setAllOrders(res2.data);

  //     setLoading(false);
  //   }

  //   fetchData();
  // }, []); 

  useEffect(() => {
    // const socket = io("http://localhost:8000", {'
    const socket = io("https://pizzapointserver.onrender.com", {
      transports: ["websocket"],
    });


    socket.emit("join_admin");

    socket.on("new_order", (order) => {
      console.log("🔥 Real-time order:", order);
      setNewOrders(order);
      playsound();
    });

    return () => {
      socket.disconnect(); // ✅ important
    };
  }, []);



  return (
    <div className="orders-page">
      {isMobile ? (
        <div onClick={press}>
          <ArrowBackIcon />
        </div>
      ) : (
        ""
      )}
      {newOrders && newOrders.order ? (
        <div className="new-order">
          <h1>New Orders ({newOrderCount})</h1>
          <div className="details-sec">
            <div style={{ color: "blue", fontWeight: 500, fontSize: "12px" }}>
              Orderd by {newOrders.username}
            </div>
            <div style={{ color: "blue", fontWeight: 500, fontSize: "12px", display: 'flex', gap: '5px' }}>
              <span>{newOrders.date}</span>
              <span>{newOrders.time}</span>
            </div>
            <div className="user-order">
              {newOrders.order.map((item, index) => (
                <div
                  className="order-item"
                  key={index}
                  style={{ fontWeight: "500" }}
                >
                  <div>
                    {item.type === "veg" ? (
                      <>
                        <img
                          className="item-type-png"
                          alt="veg"
                          src="https://clipground.com/images/veg-logo-png-6.png"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className="item-type-png"
                          alt="non-veg"
                          src="https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"
                        />
                      </>
                    )}
                    {item.quantity} x {item.name}
                  </div>
                  <div>₹{item.price}</div>
                </div>
              ))}
              <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid rgb(209, 209, 209)",
                  margin: "10px 0",
                }}
              ></div>
              <div className="order-item">
                <div>
                  Total Bill <span style={{ color: "red" }}>Paid</span>
                </div>
                <div>{newOrders.total}</div>
              </div>
              <div className="btn-sec">
                <button className="accept" style={{ cursor: 'pointer' }} onClick={() => accept()}>
                  Accept
                </button>
                <button className="cancel" style={{ cursor: 'pointer' }} onClick={cancel}>
                  Cancel
                </button>
              </div>
            </div>
            <div className=""></div>
          </div>
          <div></div>
        </div>
      ) : (
        ""
      )}
      <div>All Orders ({allorders ? allorders.length : 0})</div>
      <div className="all-order-sec">
        {allorders
          ? allorders.map((item, index) => (
            <div className="acc-ord-box" key={index}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <span style={{ color: "blue", fontWeight: 500, fontSize: "12px" }}> Orderd by {item.username}</span>
                <span style={{ color: "blue", fontWeight: 500, fontSize: "12px", display: 'flex', gap: '5px' }}>
                  <span>{item.date}</span>
                  <span>{item.time}</span>
                </span>
                {/* <span>{item.date.date}</span> */}
              </div>
              <div className="user-order">
                {allorders
                  ? item.order.map((item, index) => (
                    <div
                      className="order-item"
                      key={index}
                      style={{ fontWeight: "500" }}
                    >
                      <div>
                        {item.type === "veg" ? (
                          <>
                            <img
                              className="item-type-png"
                              alt="veg"
                              src="https://clipground.com/images/veg-logo-png-6.png"
                            />
                          </>
                        ) : (
                          <>
                            <img
                              className="item-type-png"
                              alt="non-veg"
                              src="https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"
                            />
                          </>
                        )}
                        {item.quantity} x {item.name}
                      </div>
                      <div>₹{item.price}</div>
                    </div>
                  ))
                  : "NO Order Yet"}
                <div
                  style={{
                    width: "100%",
                    borderBottom: "1px solid rgb(209, 209, 209)",
                    margin: "10px 0",
                  }}
                ></div>
                <div className="order-item">
                  <div>
                    Total <span style={{ color: "green", marginLeft: '5px' }}>{item.paymentType}</span>
                  </div>
                  <div>{item.total}</div>
                </div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', cursor: 'pointer', borderRadius: '5px', padding: '5px 0', marginTop: '10px' }}>
                  <div onClick={() => showUserDetails(index)}>User Details</div>
                  <ArrowDropDownIcon />
                </div>
                {selectedUser === index && (
                  <div className="user-order">
                    {/* style={{ display: `${userDetailsShow === index ? 'flex' : 'none'}` }}  */}
                  <div className="order-item">
                    <span>Name</span>
                    <span>{item.username}</span>
                  </div>
                  <div className="order-item">
                    <span>Phone</span>
                    <span>+91{item.contact}</span>
                  </div>
                  <div className="order-item">
                    <span>Address</span>
                    <span>{item.address}</span>
                  </div>
                </div>
                )}
                {/* <div className="order-item">
                    <button className="order-status-btn">Deliverey</button>
                  </div> */}
              </div>
            </div>
          ))
          : ""}
      </div>
    </div>
  );
}

export default OrdersPage;
