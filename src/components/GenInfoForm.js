import React from "react"; 
import {format} from "date-fns"; 

const GenInfoForm = (props) => { 
    const { editGeneralInfo } = props; 
    return(
        <div>
            <form hidden id = "editGenInfoForm"> 
                <label htmlFor = "fullNameEdit" name = 'fullName'>Full name: </label>
                <input type = 'text' id = "fullNameEdit" name = 'fullName' onChange = {editGeneralInfo} />

                <label htmlFor = "dateEdit" name = 'dateBirth'>Date of birth: </label>
                <input type = 'date' id = "dateEdit" name = 'dateBirth'  max = {format(new Date(), "yyyy-MM-dd")} onChange = {editGeneralInfo}/>

                <label htmlFor = "emailEdit" name = 'email'>Email: </label>
                <input type = 'email' id = "emailEdit" name = 'email' onChange = {editGeneralInfo}/>

                <label htmlFor = "phoneEdit" name = 'phone'>Phone: </label>
                <input type = 'tel' id = "phoneEdit" name = 'phone' 
                        pattern = "[0-9]{2}[0-9]{5}[0-9]{4}" onChange = {editGeneralInfo}/>
                <small>Format: (55) 54321 - 4321</small>

                <button onClick = {
                    (e) => { e.preventDefault();
                    let form = document.getElementById("editGenInfoForm"); form.hidden = true; form.reset() } }> 
                    Close 
                </button>
            </form>
        </div>
    )
}

export default GenInfoForm;