import React from 'react'

const NoChangesComponent = ({section}) => {
    let iconExpression = ""
    let text = ""
  
    switch(section){
        case "timeline":
            iconExpression = "frown outline icon"
            text = "No changes !"
            break
        case "all_users":
            iconExpression = "info icon"
            text = "No User is added yet!"
            break
        case "changes":
            iconExpression = "info icon"
            text = "No change Recorded yet!"   
            break
        default:
          iconExpression = "frown outline icon"
          text = "No changes yet"  
        
    }
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="ui icon large blue message"
          style={{ marginTop: "2rem", width: "85%" }}
        >
          <i className={iconExpression}></i>
          <div className="content">
            <div className="header">{text}</div>
          </div>
        </div>
      </div>
    );
  }

export default NoChangesComponent