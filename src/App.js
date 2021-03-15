import  React from "react";
import Draggable from 'react-draggable';
import uniqid from "uniqid"; 
import { parseISO, format } from "date-fns";
import GeneralInfo from "./components/GeneralInfo";
import GenInfoForm from "./components/GenInfoForm";
import Education from "./components/Education";
import { EducationForm } from "./components/EducationForm";
import JobExp from './components/JobExp';
import { JobExpForm } from "./components/JobExpForm";
import ViewMode from "./components/ViewMode";

class App extends React.Component{ 
  constructor(){ 
    super(); 

    this.state = { 
      generalInfo: { }, 

      education: [ ],

      jobExp: [ ]
    } 

    this.editGeneralInfo = this.editGeneralInfo.bind(this)

    this.editEducation = this.editEducation.bind(this)

    this.editJobExp = this.editJobExp.bind(this)

    this.deleteState = this.deleteState.bind(this)

    this.deleteGeneralInfo = this.deleteGeneralInfo.bind(this)
  }

  editGeneralInfo(e){ 
    if(e.target.name !== 'dateBirth'){ 
      this.setState({
        generalInfo: { ...this.state.generalInfo, [e.target.name]: e.target.value }
      }, () => { console.log(this.state) })
    
    }else{ 
      let date = parseISO(e.target.value); 
      let today = new Date(); 
        if (date < today){
          let stringDate = format(date, "do 'of' MMMM, yyyy") 
          this.setState({
            generalInfo: { ...this.state.generalInfo, [e.target.name]: stringDate }
          }, () => { console.log(this.state) }) 
        }else{
          alert("Please insert a valid date")
        }
    }
  }
  
  editEducation(){ 
    let course = document.getElementById('course').value; 
    let institution = document.getElementById('institution').value; 

    let startDate = document.getElementById('startDate').value;
      let startDateISO = parseISO(startDate); 
      let startDString = format(startDateISO, "MMMM, yyyy");

    let endDate = document.getElementById('endDate').value;
      let endDateISO = parseISO(endDate); 
      let endDString = format(endDateISO, "MMMM, yyyy"); 

    let id = uniqid(); 

    let array = document.getElementsByName('level'); 
      for (let index = 0; index < array.length; index++) {
        if (array[index].checked === true){ 
          let level = array[index].value;
          this.setState({
            education: [ 
              { 
                id: id, 
                level: level,
                course: course, 
                institution: institution, 
                startDate: startDString, 
                endDate: endDString
              },
              ...this.state.education
            ]
          }, ()=>{console.log(this.state)})
        }    
      }
  }

  deleteState(property, id){ 
    let array = this.state[property]; 
    
    let indexofRemoval = array.findIndex((object)=>{
      return object[id]
    })

    array.splice(indexofRemoval, 1);   
    console.log(array); 

    this.setState({ [property]: array })
  }

  deleteGeneralInfo(property){ 
   let alteredState = this.state.generalInfo; 
   delete alteredState[property]; 
   
   this.setState({ generalInfo: {...alteredState} }, () =>{console.log(this.state)})
  }

  editJobExp(){ 
    let company = document.getElementById("company").value; 
    let position = document.getElementById("positionTitle").value; 
    let responsibility = document.getElementById("responsibleFor").value; 
      
    let startDate = parseISO(document.getElementById("startDateJob").value); 
    let stringStart = format(startDate, "MMMM, yyyy") 

    let endDate = parseISO(document.getElementById("endDateJob").value); 
    let stringEnd = format(endDate, "MMMM, yyyy") 

    let id = uniqid(); 

    this.setState(prevState => ({
      jobExp: [
          { 
          id: id, 
          company: company, 
          positionTitle: position, 
          responsibleFor: responsibility, 
          startDate: stringStart, 
          endDate: stringEnd 
        }, 
        ...prevState.jobExp
      ]
    }), ()=>{ console.log(this.state) } )

  }

  render(){ 
    return(
      <>
        <section>
          <GeneralInfo {... this.state.generalInfo} deleteGeneralInfo = {this.deleteGeneralInfo} />
          <button onClick = { () => {document.getElementById("editGenInfoForm").hidden = false} }> Edit general information </button>
          <GenInfoForm  editGeneralInfo = {this.editGeneralInfo}/>
        </section>

        <section>
          <ul>
            {this.state.education.map( object => { 
              return(
                <>
                  <Education {...object} deleteState = {this.deleteState} key = {object.id}/>
                  <button onClick = {() => {this.deleteState("education", object.id)} }> X </button>
                </>
              ) 
            } ) }
          </ul>
          
          <button onClick = { () => {document.getElementById("educationForm").hidden = false} } > Edit education </button>
          <EducationForm editEducation = {this.editEducation}/>
        </section>

        <section>
          <ul>
            {this.state.jobExp.map( object => { 
              return(
                <>
                  <JobExp {...object} deleteState = {this.deleteState} key = {object.id}/>
                  <button onClick = {() => {this.deleteState("jobExp", object.id)} }> X </button>
                </>
              ) 
            } ) }
          </ul>

          <button onClick = { () => {document.getElementById("jobExpForm").hidden = false} } > Edit job experience </button>
          <JobExpForm  editJobExp = {this.editJobExp}/>
        </section>
        
        <ViewMode {...this.state} />
        <button onClick = {() => { document.getElementById("viewMode").hidden = false } }>Toggle full view mode</button>
      </>
    )
  }
}

export default App;
