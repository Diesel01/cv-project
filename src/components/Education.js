import React from "react";

export default class Education extends React.Component{ 
    render(){ 
        const { levelG, courseG, institutionG, startDateG, endDateG } = this.props; 
        const { levelU, courseU, institutionU, startDateU, endDateU } = this.props; 
        return(
            <div>
                <button onClick = { () => {document.getElementById("editGraduateForm").hidden = false} }> Edit </button>
                <ul>
                    Education: 
                    <li> {levelG} in {courseG} at {institutionG}, from {startDateG} until {endDateG} </li>
                    <li> {levelU} of {courseU} at {institutionU}, from {startDateU} until {endDateU} </li>
                </ul>
        </div>
        )
        
    }
}