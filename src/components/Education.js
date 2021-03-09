import React from "react";

export default class Education extends React.Component{ 
    render(){ 
        const { level, course, institution, startDate, endDate, deleteState } = this.props; 
        return(
            <div>
                <li> {level} in {course} at {institution}, from {startDate} until {endDate} </li>
                <button onClick = {() => {deleteState("education", level)} }> Delete </button>
            </div>
        )
        
    }
}