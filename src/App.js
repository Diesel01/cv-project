import  React from "react";
import { GeneralInfo } from "./components/GeneralInfo";
import { parseISO, format } from "date-fns";


class App extends React.Component{ 
  constructor(){ 
    super(); 

    this.state = { 
      firstName: "",  
      secondName: '', 
      dateBirth: '', 
      email: '', 
      phone: ''
    }

    this.getGeneralInfo = this.getGeneralInfo.bind(this)
  }

  getGeneralInfo(e){ 
    e.preventDefault(); 
    // let firNameInput = document.getElementById("firNameInput").value
    // let secNameInput = document.getElementById('secNameInput').value
    let dateInput = document.getElementById('dateInput').value
      let date = parseISO(dateInput)
      let stringDate = format(date, "do 'of' MMMM, yyyy")
    // let emailInput = document.getElementById('emailInput').value
    // let phoneInput = document.getElementById('phoneInput').value

    this.setState(
      { firstName: document.getElementById("firNameInput").value, 
        secondName: document.getElementById('secNameInput').value, 
        dateBirth: stringDate,  
        email: document.getElementById('emailInput').value, 
        phone: document.getElementById('phoneInput').value 
      }, 
      () => { console.log(this.state); } 
    )
  } 
  
  render(){ 
    return(
      <div>
        <form onSubmit = {this.getGeneralInfo}> 
          <label htmlFor = "firNameInput" name = 'firstName'>First name: </label>
          <input type = 'text' id = "firNameInput" name = 'firstName' />

          <label htmlFor = "secNameInput" name = 'secondName'>Second name: </label>
          <input type = 'text' id = "secNameInput" name = 'secondName' />

          <label htmlFor = "dateInput" name = 'dateBirth'>Date of birth: </label>
          <input type = 'date' id = "dateInput" name = 'dateBirth'  max = {new Date()}/>

          <label htmlFor = "emailInput" name = 'email'>Email: </label>
          <input type = 'email' id = "emailInput" name = 'email' />

          <label htmlFor = "phoneInput" name = 'phone'>Phone: </label>
          <input type = 'tel' id = "phoneInput" name = 'phone' 
            pattern = "[0-9]{2}[0-9]{5}[0-9]{4}"/>
          <small>Format: (55) 54321 - 4321</small>

          <input type = 'submit'></input>
        </form>
        <GeneralInfo {... this.state} />
      </div>

    )
  }
}

export default App;
