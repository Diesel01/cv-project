import React from "react";

export default class Education extends React.Component{ 
    render(){ 
        const { levelGraduate, courseGraduate, institutionGraduate, startDateGraduate, endDateGraduate } = this.props; 
        const { levelU, courseU, institutionU, startDateU, endDateU } = this.props; 
        return(
            <div>
                <button onClick = { () => {document.getElementById("educationForm").hidden = false} } > Edit </button>
                <ul>
                    Education: 
                    <li> {levelGraduate} in {courseGraduate} at {institutionGraduate}, from {startDateGraduate} until {endDateGraduate} </li>
                    <li> {levelU} of {courseU} at {institutionU}, from {startDateU} until {endDateU} </li>
                </ul>
            </div>
        )
        
    }
}