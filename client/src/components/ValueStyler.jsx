import React from 'react'

//this function returns styled values
const ValueStyler = value => {
    if (!value) {
      return (
        <b style={{ background: "blue", color: "white", padding: ".2rem .2rem" }}>
          empty
        </b>
      );
    }
  
    if (value.length === 1 && parseInt(value)) {
      return <b>private</b>;
    } else if (value.length === 1 && !parseInt(value)) {
      return <b>public</b>;
    }
    return <b>{value}</b>;
  };

export default ValueStyler  