import React from "react";
export default class JobExp extends React.Component{ 
    render(){ 
        const {company, positionTitle, responsibleFor, startDate, endDate} = this.props
        
        return (
            <li>
                {positionTitle} in {company}, from {startDate} until {endDate}, responsible for {responsibleFor}
            </li>
        )
    }
}