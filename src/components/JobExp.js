import React from "react";

export default class JobExp extends React.Component{ 
    render(){ 
        const {company, positionTitle, responsibleFor, startDate, endDate} = this.props

        return(
            // <ul>
            // { (() => { 
            //         let objects = this.props.map((key) => { 
            //             let { positionTitle, company, startDate, endDate, responsibleFor } = this.props[key]; 
            //             return (
            //                 <li id = {`${[key]+positionTitle}`}>
            //                     {positionTitle} in {company}, from {startDate} until {endDate}, responsible for {responsibleFor}
            //                 </li> 
            //             )
            //         })

            //         // for (let value in this.props) { 
            //         //     console.log(this.props)
            //         //     let { positionTitle, company, startDate, endDate, responsibleFor } = this.props[value]; 
            //         //     if (document.getElementById(`${[value]+positionTitle}`) == null){
            //         //         return (
            //         //             <li id = {`${[value]+positionTitle}`}>
            //         //                 {positionTitle} in {company}, from {startDate} until {endDate}, responsible for {responsibleFor}
            //         //             </li> 
            //         //         )
            //         //     }
            //         // }
            //     })()
            // } 
            // </ul>
        
            <li>{positionTitle} in {company}, from {startDate} until {endDate}, responsible for {responsibleFor} {console.log(this.props)}</li>
        
        )
    }
}