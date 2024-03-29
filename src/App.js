import  React from "react";
import uniqid from "uniqid"; 
import { parseISO, format } from "date-fns";
import GeneralInfo from "./components/GeneralInfo";
import GenInfoForm from "./components/GenInfoForm";
import Education from "./components/Education";
import { EducationForm } from "./components/EducationForm";
import JobExp from './components/JobExp';
import { JobExpForm } from "./components/JobExpForm";
import ViewMode from "./components/ViewMode";
import StyleSelector from "./components/StyleSelector";
import PdfGenerator from "./components/pdfGenerator";
import Draggable from "react-draggable";
class App extends React.Component{ 
  constructor(){ 
    super(); 

    this.state = { 
      generalInfo: { 
        display: false
      }, 

      education: [ ],

      jobExp: [ ], 

      viewMode: false, 

      styleSelector: { 
        generalInfo: false, 
        education: false, 
        jobExp: false
      },

      transformGeneralInfo: {} 
    } 

    this.editGeneralInfo = this.editGeneralInfo.bind(this)

    this.editEducation = this.editEducation.bind(this)

    this.editJobExp = this.editJobExp.bind(this)

    this.deleteState = this.deleteState.bind(this)

    this.deleteGeneralInfo = this.deleteGeneralInfo.bind(this)

    this.changeStyle = this.changeStyle.bind(this)

    this.changeViewMode = this.changeViewMode.bind(this)

    this.getTransformValues = this.getTransformValues.bind(this)
  }

  editGeneralInfo(e){ 

    if(e.target.name !== 'dateBirth'){ 
      this.setState({
        generalInfo: { ...this.state.generalInfo, [e.target.name]: e.target.value, display: true }
      }, () => { console.log(this.state) })
    
    }else{ 
      let date = parseISO(e.target.value); 
      let today = new Date(); 
        if (date < today){
          let stringDate = format(date, "do 'of' MMMM, yyyy") 
          this.setState({
            generalInfo: { ...this.state.generalInfo, [e.target.name]: stringDate, display: true }
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
      let startDString = format(startDateISO, "do, MMMM, yyyy");

    let endDate = document.getElementById('endDate').value;
      let endDateISO = parseISO(endDate); 
      let endDString = format(endDateISO, "do, MMMM, yyyy"); 

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
    let stringStart = format(startDate, "do, MMMM, yyyy") 

    let endDate = parseISO(document.getElementById("endDateJob").value); 
    let stringEnd = format(endDate, "do, MMMM, yyyy") 

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

  changeStyle(element){ 
    let value = !this.state.styleSelector[element]; 
    this.setState({ styleSelector: { ...this.state.styleSelector, [element]: value} })
  }

  changeViewMode(){ 
    let value = !this.state.viewMode; 
    this.setState({ viewMode: value })
  }

  getTransformValues(index, id){
    const element = document.getElementsByClassName("react-draggable")[index]
    const style = window.getComputedStyle(element)
    const matrix = style['transform'] || style.mozTransform;

    let values = {};

    if (matrix === 'none' || typeof matrix === 'undefined') { //I'm not sure if this conditional is really necessary
        values = { x: 0, y: 0}
        this.setState({
            ...this.state, 
            [`transform${id}`]: values
        }, () => {console.log(this.state)})
        return    
    }

    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', '); 

    values = { x: matrixValues[4], y: matrixValues[5]}

    this.setState({
        ...this.state, 
        [`transform${id}`]: values
    }, () => {console.log(this.state)})

};

  render(){ 
    return(
      <div 
        style = {{
          display: 'grid', 
          gridTemplateColumns: "auto auto"
        }}
      >
         
      <div id = "editMode"
        style = {{
          position: 'relative',
          margin: '10px', 
          height: "842px", 
          width: "595px" 
        }}
      >

        {/* General infomation section ---------------------------------------------------------------------- */}
          { this.state.generalInfo.display ?                      
            <GeneralInfo 
              {...this.state.generalInfo} 
              deleteGeneralInfo = {this.deleteGeneralInfo} 
              onStopHandle = {this.getTransformValues} 
            /> 
            : 
            null 
          }

          <button onClick = { () => {document.getElementById("editGenInfoForm").hidden = false} }> Edit general information </button>
          
          <GenInfoForm  editGeneralInfo = {this.editGeneralInfo}/>
          
          <button onClick = { () => { this.changeStyle("generalInfo"); } }> Edit style </button>
          
          { this.state.styleSelector.generalInfo ? 
            <StyleSelector elementId = "fullName"/> 
            : 
            null 
          }


        {/* Education section ------------------------------------------------------------------------------- */}
          <Draggable
            onStop = { () => {this.getTransformValues(1, 'Education')} }
            bounds = "parent"
          >
            <ul className = "educationList" style = {{position: "static"}}>
              {this.state.education.map( object => { 
                return(
                  <>
                    <Education {...object} />
                    <button onClick = {() => {this.deleteState("education", object.id)} }> X </button>
                  </>
                )
              })}
            </ul>
          </Draggable>

          <button onClick = { () => {document.getElementById("educationForm").hidden = false} } > Edit education </button>
          <EducationForm editEducation = {this.editEducation}/>

          <button onClick = { () => { this.changeStyle("education"); } }> Edit style </button>
          { this.state.styleSelector.education ? <StyleSelector elementId = "educationList"/> : null }


        {/* Job exeperience section ----------------------------------------------------------------------- */}
          <Draggable
            onStop = { () => {this.getTransformValues(2, 'JobExp')} }
            bounds = "parent"
          >
            <ul className = "jobExpList">

              {this.state.jobExp.map( object => { 

                return(
                  <>
                    <JobExp 
                      {...object}   
                      deleteState = {this.deleteState} 
                      onStopHandle = {this.getTransformValues}
                      key = {object.id}
                    />
                    <button onClick = {() => {this.deleteState("jobExp", object.id)} }> X </button>
                  </>
                )

              })}

            </ul>
          </Draggable>

          <button onClick = { () => {document.getElementById("jobExpForm").hidden = false} } > Edit job experience </button>
          <JobExpForm  editJobExp = {this.editJobExp}/>

          <button onClick = { () => { this.changeStyle("jobExp"); } }> Edit style </button>
          { this.state.styleSelector.jobExp ? <StyleSelector elementId = "jobExpList"/> : null }

      </div>

      <button onClick = {() => { this.changeViewMode() } }>Toggle full view mode</button>

      {this.state.viewMode ? <ViewMode {...this.state} /> && <PdfGenerator {...this.state} /> : null }
      </div>
    )
  }
}

export default App;
