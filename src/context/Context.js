import { createContext, useState } from "react";

export const Context = createContext();

export const MyContextProvider = ({ children }) => {
    const [sidebarOpen,setSidebarOpen] = useState(false);
    const [category,setCategory] = useState('')
    const [cart,setCart] = useState([]);
    const [total,setTotal] = useState(0);
    const [loggedIn,setLoggedIn] = useState(false);
    const [allorders,setAllOrders] = useState([]);
    const [itemInfo,setItemInfo] = useState({})
    const [profileDetails,setProfileDetails] = useState({"username":"arjun",
      "email":"ar885209@gmail.com",
      "password":"ar12ju34",
      "contact":"7350887544",
      "address":"wadgaon"
    })
    const [rightSec,setRIghtSec] = useState(false);
    const [newOrder,setNewOrder] = useState({});
    const [adminOrders,setAdminOrders] = useState([]);
    const [adminEmail,setAdminEmail] = useState("ar885209@gmail.com");
    const [adminPassword,setAdminPassword] = useState("ar12ju34");
    

  return (
    <Context.Provider
      value={{sidebarOpen,setSidebarOpen,cart,setCart,total,setTotal,loggedIn,setLoggedIn,itemInfo,setItemInfo,allorders,setAllOrders,profileDetails,setProfileDetails,rightSec,setRIghtSec,newOrder,setNewOrder,adminOrders,setAdminOrders,category,setCategory,adminEmail,setAdminEmail,adminPassword,setAdminPassword}}
    >
      {children}
    </Context.Provider>
  );
};