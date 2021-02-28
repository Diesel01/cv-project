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

    // this.getGeneralInfo = this.getGeneralInfo.bind(this)
    this.editGeneralInfo = this.editGeneralInfo.bind(this)
  }

  // getGeneralInfo(e){ 
  //   e.preventDefault(); 

  //   let dateInput = document.getElementById('dateInput').value
  //   if (dateInput !== ""){ 
  //     let date = parseISO(dateInput);
  //     let stringDate = format(date, "do 'of' MMMM, yyyy");
  //     this.setState({
  //       dateBirth: stringDate
  //     })
  //   }

  //   this.setState(
  //     { firstName: document.getElementById("firstNameInput").value, 
  //       secondName: document.getElementById('secondNameInput').value,   
  //       email: document.getElementById('emailInput').value, 
  //       phone: document.getElementById('phoneInput').value 
  //     }, 
  //     () => { console.log(this.state); } 
  //   )
  // }
  
  editGeneralInfo(e){ 
    if(e.target.name !== 'dateBirth'){ 
      this.setState({
      [e.target.name]: e.target.value
      }, () => { return (<GeneralInfo {...this.state} />, console.log(this.state)) })
    
    }else{ 
      let dateInput = e.target.value; 
      let date = parseISO(dateInput)
      let stringDate = format(date, "do 'of' MMMM, yyyy") 
      this.setState({
        [e.target.name]: stringDate
      }, () => { return (<GeneralInfo {...this.state} />, console.log(this.state)) })
    }
  }
  
  render(){ 
    return(

      <div>
        {/* <form onSubmit = {this.getGeneralInfo}> 
          <label htmlFor = "firstNameInput" name = 'firstName'>First name: </label>
          <input type = 'text' id = "firstNameInput" name = 'firstName' />

          <label htmlFor = "secondNameInput" name = 'secondName'>Second name: </label>
          <input type = 'text' id = "secondNameInput" name = 'secondName' />

          <label htmlFor = "dateInput" name = 'dateBirth'>Date of birth: </label>
          <input type = 'date' id = "dateInput" name = 'dateBirth'  max = {format(new Date(), "yyyy-MM-dd")} />

          <label htmlFor = "emailInput" name = 'email'>Email: </label>
          <input type = 'email' id = "emailInput" name = 'email' />

          <label htmlFor = "phoneInput" name = 'phone'>Phone: </label>
          <input type = 'tel' id = "phoneInput" name = 'phone' 
            pattern = "[0-9]{2}[0-9]{5}[0-9]{4}"/>
          <small>Format: (55) 54321 - 4321</small>

          <input type = 'submit'></input>
        </form> */}
        <GeneralInfo {... this.state} />

        <form hidden id = "editGenInfoForm"> 
          <label htmlFor = "firstNameEdit" name = 'firstName'>First name: </label>
          <input type = 'text' id = "firstNameEdit" name = 'firstName' onChange = {this.editGeneralInfo} />

          <label htmlFor = "secondNameEdit" name = 'secondName'>Second name: </label>
          <input type = 'text' id = "secondNameEdit" name = 'secondName' onChange = {this.editGeneralInfo}/>

          <label htmlFor = "dateEdit" name = 'dateBirth'>Date of birth: </label>
          <input type = 'date' id = "dateEdit" name = 'dateBirth'  max = {format(new Date(), "yyyy-MM-dd")} onChange = {this.editGeneralInfo}/>

          <label htmlFor = "emailEdit" name = 'email'>Email: </label>
          <input type = 'email' id = "emailEdit" name = 'email' onChange = {this.editGeneralInfo}/>

          <label htmlFor = "phoneEdit" name = 'phone'>Phone: </label>
          <input type = 'tel' id = "phoneEdit" name = 'phone' 
            pattern = "[0-9]{2}[0-9]{5}[0-9]{4}" onChange = {this.editGeneralInfo}/>
          <small>Format: (55) 54321 - 4321</small>

          <button onClick = {(e) => {e.preventDefault(); document.getElementById("editGenInfoForm").hidden = true}}> Close </button>
        </form>
      </div>

    )
  }
}

export default App;
