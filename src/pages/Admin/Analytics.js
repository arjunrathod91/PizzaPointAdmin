import React, { useContext } from "react";
import { Context } from "../../context/Context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMediaQuery } from "@mui/material";

function Analytics() {
  const { allorders, setAllOrders, rightSec, setRIghtSec } =
    useContext(Context);
    const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <div className="analytics">
       {isMobile ? (
        <div onClick={() => setRIghtSec(false)}>
          <ArrowBackIcon />
        </div>
      ) : (
        ""
      )}
      <h2>Analytics</h2>
      <div className="content-box">
        <div>Sales</div>
        <div>200</div>
      </div>
      <div className="content-box">
        <div>Orders</div>
        <div>10</div>
      </div>
      <div className="content-box">
        <div>Monthly Sales</div>
        <div>10</div>
      </div>
      <div className="content-box">
        <div>weekly Sales</div>
        <div>10</div>
      </div>
      <div className="content-box">
        <div>Which Product Working</div>
        <div>Pizza</div>
      </div>
    </div>
  );
}

export default Analytics;
