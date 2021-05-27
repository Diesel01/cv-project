import React from "react"; 
import {format} from "date-fns"; 
import "../styles/Forms.css";
import "../styles/CV.css";

const GenInfoForm = (props) => { 
    const { editGeneralInfo, toggleForm } = props; 
    return(
        <div>
            <form id = "editGenInfoForm" className = "form">
                <div className = "input" style = {{display: "flex"}}>
                    <p> <b>Please enter your general information:</b> </p>
                    <button onClick = {() => {toggleForm("generalInfo")}} className = 'button'>
                        <img src = 'imgs/close.svg' alt = 'Close general info form' />
                    </button>
                </div>
                
                <div className = "input">
                    <label htmlFor = "fullNameEdit" name = 'fullName'>Full name: </label>
                    <input type = 'text' id = "fullNameEdit" name = 'fullName' onChange = {editGeneralInfo} />
                </div>
                
                <div className = "input">
                    <label htmlFor = "dateEdit" name = 'dateBirth'>Date of birth: </label>
                    <input type = 'date' id = "dateEdit" name = 'dateBirth'  max = {format(new Date(), "yyyy-MM-dd")} onChange = {editGeneralInfo}/>        
                </div>
            
                <div className = "input">
                    <label htmlFor = "emailEdit" name = 'email'>Email: </label>
                    <input type = 'email' id = "emailEdit" name = 'email' onChange = {editGeneralInfo}/>
                </div>

                <div className = "input">
                    <label htmlFor = "phoneEdit" name = 'phone'>Phone: </label>
                    <input 
                        type = 'tel' id = "phoneEdit" name = 'phone' 
                        pattern = "[0-9]{2}[0-9]{5}[0-9]{4}" onChange = {editGeneralInfo}
                    />
                    <small>Format: (55) 54321 - 4321</small>
                </div>
            </form>
        </div>
    )
}

export default GenInfoForm;