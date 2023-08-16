import "../LandingPage/LandingPage.css";
import { MdOutlineAttractions } from "react-icons/md";
import { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Button } from "antd";
import "./search.css";

function Search() {
  const { RangePicker } = DatePicker;

  return (
      <div
        className="search-fields"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          margin:"1rem 1rem 10rem 1rem"
        }}
      >
        <div className="search-ip-1">
          <div className="ip-1">
            <Input
            bordered={false}
            id="destination-ip"
              size="large"
              placeholder="Where Are You Going ?"
              prefix={<SearchOutlined style={{fontSize:"1.5rem",marginRight:"1rem"}} />}
              style={{height:"3.75rem",borderRadius:'0 !important'}} 
              Auto
            />
          </div>
          <div className="ip-2">
            <RangePicker bordered={false} id="DateInput_input" placeholder={["Start Date","End Date"]} size="large" style={{height:"3.75rem",backgroundColor:"#fff"
      ,borderRadius:"none"}} />
          </div>
        </div>
        <div className="search-ip-2">
          <button className="my-btn search-btn" style={{height:"3.75rem",width:"10rem"}}>
            Search
          </button>
        </div>
      </div>

  );
}

export default Search;
