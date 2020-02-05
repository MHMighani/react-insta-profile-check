import React from "react";

//this function returns styled values
const ValueStyler = (value, parameterChanged) => {
  if (value && parameterChanged === "profile_pic_url") {
    return <img className="ui avatar image tiny" src={value} alt="profile pic"></img>;
  }
  if (!value) {
    return (
      <b style={{ background: "blue", color: "white", padding: ".2rem .2rem" }}>
        empty
      </b>
    );
  }

  if (value.length === 1 && parseInt(value)) {
    if(parameterChanged==="is_active"){
      return <b>active</b>
    }
      return <b>private</b>;
  } else if (value.length === 1 && !parseInt(value)) {
    if(parameterChanged==="is_active"){
      return <b>deactive</b>
    }
    return <b>public</b>;
  }
  return <b>{value}</b>;
};

export default ValueStyler;
