import React from "react";

export default class JobExp extends React.Component{ 
    render(){ 
        // const {company, positionTitle, responsibleFor, startDate, endDate} = this.props

        return(
            <ul>
            { (() => { for (let value in this.props) { 
                        for (let object in value){
                            console.log(typeof(object)); 
                            console.log(this.props)
                            return <li>{object.positionTitle} in {object.company}, from {object.startDate} until {object.endDate}, responsible for {object.responsibleFor}</li> 
                        }
                    }
                })()
            } 
            </ul>
        
            // <li>{positionTitle} in {company}, from {startDate} until {endDate}, responsible for {responsibleFor} {console.log(this.props)}</li>
        
        )
    }
}