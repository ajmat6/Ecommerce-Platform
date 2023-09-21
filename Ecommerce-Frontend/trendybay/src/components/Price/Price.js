import React from "react";
import { BiRupee } from "react-icons/bi";

const Price = (props) => {
  return (
    <div
      style={{
        fontSize: props.fontSize ? props.fontSize : "14px",
        fontWeight: "bold",
        margin: "5px 0",
      }}
    >
      <BiRupee style={{marginBottom: '2px'}}/>
      {props.value}
    </div>
  );
};

export default Price;