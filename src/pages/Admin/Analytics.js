import React, { useContext } from "react";
import { Context } from "../../context/Context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMediaQuery } from "@mui/material";

function Analytics({locator, allorders }) {
  const { setRIghtSec } =
    useContext(Context);
    const isMobile = useMediaQuery("(max-width:600px)");

  const uniqueUserCount = new Set(
  allorders.map(order => order.email)
).size;

const totalSales = allorders.reduce(
  (sum, order) => sum + order.total,
  0
);

console.log(uniqueUserCount);  
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
        <div>{totalSales}</div>
      </div>
      <div className="content-box">
        <div>Orders</div>
        <div>{allorders.length}</div>
      </div>
      <div className="content-box">
        <div>Users</div>
        <div>{uniqueUserCount}</div>
      </div>
      {/* <div className="content-box">
        <div>weekly Sales</div>
        <div>10</div>
      </div>
      <div className="content-box">
        <div>Which Product Working</div>
        <div>Pizza</div>
      </div> */}
    </div>
  );
}

export default Analytics;
