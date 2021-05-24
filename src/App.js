import React from "react";
import uniqid from "uniqid";
import { parseISO, format } from "date-fns";
import GenInfoForm from "./components/GenInfoForm";
import { EducationForm } from "./components/EducationForm";
import { JobExpForm } from "./components/JobExpForm";
import StyleSelector from "./components/StyleSelector";
import PdfGenerator from "./components/pdfGenerator";
import Draggable from "react-draggable";
import { DragDropContext } from 'react-beautiful-dnd';
import DragnDrop from "./components/DragnDrop";
import "./styles/App.css";
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      generalInfo: {
        display: false,
        id: 'generalInfo',
        fullName: "Mathes D.",

        showStyleSelector: () => { this.changeStyle('generalInfo') }, 
        toggleForm: () => { this.toggleForm("generalInfo") }
      },

      education: {
        items: [
          {
            id: "awd",
            level: 'Undergraduate',
            course: 'Shit',
            institution: 'ah'
          },

          {
            id: "ad",
            level: 'Undergraduate',
            course: 'Shit',
            institution: 'ah'
          }
        ],
        id: 'education',

        showStyleSelector: () => { this.changeStyle('education') }, 
        toggleForm: () => { this.toggleForm("education") }
      },

      jobExp: {
        items: [
          {
            id: "ed", 
            positionTitle: 'Piece of shit', 
            company: 'Goddamn it', 
            responsibleFor: 'X, Y, Z'
          }
        ],
        id: 'jobExp', 

        showStyleSelector: () => { this.changeStyle("jobExp") }, 
        toggleForm: () => { this.toggleForm("jobExp") }
      },

      createPDF: false,

      componentOrder: ['generalInfo', 'education', 'jobExp'],

      styleSelector: {
        generalInfo: false,
        education: false,
        jobExp: false
      },

      showForm: {
        generalInfo: false, 
        education: false, 
        jobExp: false
      }

    }

    this.editGeneralInfo = this.editGeneralInfo.bind(this)

    this.editEducation = this.editEducation.bind(this)

    this.editJobExp = this.editJobExp.bind(this)

    this.deleteState = this.deleteState.bind(this)

    this.deleteGeneralInfo = this.deleteGeneralInfo.bind(this)

    this.changeStyle = this.changeStyle.bind(this)

    this.toggleForm = this.toggleForm.bind(this)

    this.changecreatePDF = this.changecreatePDF.bind(this)

    this.dragHandle = this.dragHandle.bind(this)
  }

  editGeneralInfo(e) {

    if (e.target.name !== 'dateBirth') {
      this.setState({
        generalInfo: { ...this.state.generalInfo, [e.target.name]: e.target.value, display: true }
      }, () => { console.log(this.state) })

    } else {
      let date = parseISO(e.target.value);
      let today = new Date();
      if (date < today) {
        let stringDate = format(date, "do 'of' MMMM, yyyy")
        this.setState({
          generalInfo: { ...this.state.generalInfo, [e.target.name]: stringDate, display: true }
        }, () => { console.log(this.state) })
      } else {
        alert("Please insert a valid date")
      }
    }
  }

  editEducation() {
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

      if (array[index].checked === true) {
        let level = array[index].value;

        let educationItems = this.state.education.items;
        let newItem = {
          id: id,
          level: level,
          course: course,
          institution: institution,
          startDate: startDString,
          endDate: endDString
        }
        educationItems.splice(0, 0, newItem)

        this.setState({
          ...this.state,
          education: {
            ...this.state.education,
            items: educationItems
          }
        }, () => { })
      }
    }
  }

  deleteState(property, id) {
    let array = this.state[property].items;

    let indexofRemoval = array.findIndex((object) => {
      return object[id]
    })

    array.splice(indexofRemoval, 1);

    this.setState({ 
        [property]: {
          ...[property], items: array
        }
      })
  }

  deleteGeneralInfo(property) {
    let alteredState = this.state.generalInfo;
    delete alteredState[property];

    this.setState({ generalInfo: { ...this.state.generalInfo, alteredState } }, () => { console.log(this.state) })
  }

  editJobExp() {
    let company = document.getElementById("company").value;
    let position = document.getElementById("positionTitle").value;
    let responsibility = document.getElementById("responsibleFor").value;

    let startDate = parseISO(document.getElementById("startDateJob").value);
    let stringStart = format(startDate, "do, MMMM, yyyy")

    let endDate = parseISO(document.getElementById("endDateJob").value);
    let stringEnd = format(endDate, "do, MMMM, yyyy")

    let id = uniqid();

    let newItem = {
      id: id,
      company: company,
      positionTitle: position,
      responsibleFor: responsibility,
      startDate: stringStart,
      endDate: stringEnd
    };

    let jobExpItems = this.state.jobExp.items;
    jobExpItems.splice(0, 0, newItem)

    this.setState({
      ...this.state,
      jobExp: {
        items: jobExpItems,
        ...this.state.jobExp
      }
    })

  }

  changeStyle(element) {
    let value = !this.state.styleSelector[element];
    this.setState({ styleSelector: { ...this.state.styleSelector, [element]: value } })
  }

  toggleForm(element){ 
    let value = !this.state.showForm[element]; 
    this.setState({ showForm: {...this.state.showForm, [element]: value } }, 
     () => {console.log(this.state)}
    )
  } 

  changecreatePDF() {
    let value = !this.state.createPDF;
    this.setState({ createPDF: value })
  }

  dragHandle(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newComponentOrder = Array.from(this.state.componentOrder);
    newComponentOrder.splice(source.index, 1);
    newComponentOrder.splice(destination.index, 0, draggableId);

    const newState = {
      ...this.state,
      componentOrder: newComponentOrder
    };

    this.setState(newState);
  }

  render() {
    return (
      <div className = "main-container">
        
        <div className = "form-div">
          { this.state.styleSelector.generalInfo ? <StyleSelector elementId = "generalInfo" /> : null }
          { this.state.styleSelector.education ? <StyleSelector elementId = "educationList" /> : null }
          { this.state.styleSelector.jobExp ? <StyleSelector elementId = "jobExpList" /> : null }

          { this.state.showForm.generalInfo ? <GenInfoForm editGeneralInfo = {this.editGeneralInfo} toggleForm ={this.toggleForm}/> : null }
          { this.state.showForm.education ? <EducationForm editEducation = {this.editEducation} toggleForm ={this.toggleForm}/> : null }
          { this.state.showForm.jobExp ? <JobExpForm editJobExp = {this.editJobExp} toggleForm ={this.toggleForm}/> : null }
        </div>

        <div className = 'cv-div'>
          <DragDropContext onDragEnd={this.dragHandle}>
            <DragnDrop 
              {...this.state} 
              deleteGeneralInfo = {this.deleteGeneralInfo}
              deleteState = {this.deleteState}
            />
          </DragDropContext>
        </div>

        <div className = "open-pdf-div">
          <button onClick = {() => {this.changecreatePDF()}}>Click here to generate a PDF of your CV</button>
          { this.state.createPDF ? 
            <PdfGenerator 
              generalInfo = {this.state.generalInfo} 
              education = {this.state.education} 
              jobExp = {this.state.jobExp} 
              componentOrder = {this.state.componentOrder}
            /> 
            : 
            null 
          }
        </div>
      
      </div> 
    )
  }
}

export default App;
