import  React from "react";
import { parseISO, format } from "date-fns";
import GeneralInfo from "./components/GeneralInfo";
import GenInfoForm from "./components/GenInfoForm";
import Education from "./components/Education";
import { EducationForm } from "./components/EducationForm";
import JobExp from './components/JobExp';
import { JobExpForm } from "./components/JobExpForm";

class App extends React.Component{ 
  constructor(){ 
    super(); 

    this.state = { 

      generalInfo: {
        firstName: '',  
        secondName: '', 
        dateBirth: '', 
        email: '', 
        phone: ''
      }, 

      education: [ ],

      jobExp: [ ]
    } 

    this.editGeneralInfo = this.editGeneralInfo.bind(this)
    this.deleteGeneralInfo = this.deleteGeneralInfo.bind(this)

    this.editEducation = this.editEducation.bind(this)
    this.deleteEducation = this.deleteEducation.bind(this)

    this.editJobExp = this.editJobExp.bind(this)
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
  
  deleteGeneralInfo(){ 
    this.setState({ 
      generalInfo: {
        firstName: "", 
        secondName: "",
        dateBirth: "",   
        email: "", 
        phone: ""
      }
    }, () => { console.log(this.state) })
  }


  editEducation(e){ 
    let stateProp
    let array = document.getElementsByName('level'); 
    
    for (let index = 0; index < array.length; index++) {
      if (array[index].checked === true){ 
        stateProp = array[index].value;
        this.setState({
          education: {...this.state.education, [stateProp]: { 
            level: stateProp, course: '', institution: '', startDate: '', endDate: ''
          } }
        })
      }    
    }
  
    if(e.target.name === 'institution' || e.target.name === 'course'){ 
      this.setState({
        education: { ...this.state.education, [stateProp]: { ...this.state.education[stateProp], [e.target.name]: e.target.value } }
      }, () => { console.log(this.state) } )

    }else if(e.target.name === 'startDate' || e.target.name === 'endDate'){ 
      let date = parseISO(e.target.value); 
      let stringDate = format(date, "MMMM, yyyy") 
      this.setState({
        education: { ...this.state.education, [stateProp]: {...this.state.education[stateProp], [e.target.name]: stringDate } }
      }, () => { console.log(this.state.education[stateProp] ) }) 
    }
  }

  deleteEducation(degree){ 
    this.setState({
      education: {...this.state.education, [degree]: { course: "", institution: "", startDate: "", endDate: "" } }
    }, ()=>{console.log(this.state.education)} )
  }


  editJobExp(){ 
    let company = document.getElementById("company").value; 
    let position = document.getElementById("positionTitle").value; 
    let responsibility = document.getElementById("responsibleFor").value; 
      
    let startDate = parseISO(document.getElementById("startDateJob").value); 
    let stringStart = format(startDate, "MMMM, yyyy") 

    let endDate = parseISO(document.getElementById("endDateJob").value); 
    let stringEnd = format(endDate, "MMMM, yyyy") 

    this.setState(prevState => ({
      jobExp: [
          { 
          company: company, 
          positionTitle: position, 
          responsibleFor: responsibility, 
          startDate: stringStart, 
          endDate: stringEnd 
        }, 
        ...prevState.jobExp
      ]
    }), ()=>{ console.log(this.state) } )

    // this.setState({
    //   jobExp: [ {
    //     ...this.state.jobExp, 
    //     [stateProp]: { 
    //       company: stateProp, 
    //       positionTitle: document.getElementById("positionTitle").value, 
    //       responsibleFor: document.getElementById("responsibleFor").value, 
    //       startDate: stringStart, 
    //       endDate: stringEnd 
    //     } 
    //   } ]
    // },()=>{ console.log(this.state) } )
  }

  render(){ 
    return(
      <div>

        <section>
          <GeneralInfo {... this.state.generalInfo} />
          <GenInfoForm  editGeneralInfo = {this.editGeneralInfo}/>
          <button onClick = {this.deleteGeneralInfo}> Delete </button>
        </section>

        <section>
          <ul>
            <Education {...this.state.education.Graduate} deleteEducation = {this.deleteEducation}/>
            <Education {...this.state.education.Undergraduate} deleteEducation = {this.deleteEducation}/>
            <Education {...this.state.education.Highschool} deleteEducation = {this.deleteEducation}/>
          </ul>
          <button onClick = { () => {document.getElementById("educationForm").hidden = false} } > Edit </button>
          <EducationForm editEducation = {this.editEducation}/>
        </section>

        <section>
          <ul>
            {this.state.jobExp.map(object =>{
              console.log(object)
              return(
                <JobExp {...object} />
              )
            })}
          </ul>
          <button onClick = { () => {document.getElementById("jobExpForm").hidden = false} } > Edit job experience </button>
          <JobExpForm  editJobExp = {this.editJobExp}/>
        </section>
        
      </div>
    )
  }
}

export default App;
