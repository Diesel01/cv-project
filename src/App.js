import  React from "react";
import GeneralInfo from "./components/GeneralInfo";
import { parseISO, format } from "date-fns";
import GenInfoForm from "./components/GenInfoForm";
import Education from "./components/Education";
import GraduateForm from "./components/EducationForm";


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

      education: {
        graduateSchool: {
          institutionG:'', 
          startDateG: '', 
          endDateG: '', 
          courseG: '',
          levelG: ''
        }, 
        undergraduate:{ 
          institution:'', 
          startDate: '', 
          endDate: '', 
          course: '',
          level: '', 
        },
      }
    } 

    this.editGeneralInfo = this.editGeneralInfo.bind(this)
    this.deleteGeneralInfo = this.deleteGeneralInfo.bind(this)

    this.editEduGraduate = this.editEduGraduate.bind(this)
  }

  editGeneralInfo(e){ 
    if(e.target.name !== 'dateBirth'){ 
      this.setState({
        generalInfo: { ...this.state.generalInfo, [e.target.name]: e.target.value }
      }, () => { console.log(this.state) })
    
    }else{ 
      let dateInput = e.target.value; 
      let date = parseISO(dateInput); 
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

  editEduGraduate(e){ 
    if(e.target.name !== 'startDate' || 'endDate'){ 
      this.setState({
        education: { ...this.state.education, graduateSchool: {...this.state.education.graduateSchool, [e.target.name]: e.target.value } }
        }, () => { console.log(this.state) }
      )
    
    }else{ 
      let dateInput = e.target.value; 
      let date = parseISO(dateInput); 
      let today = new Date(); 
        if (date < today){
          let stringDate = format(date, "do 'of' MMMM, yyyy") 
          this.setState({
            education: { ...this.state.education, graduateSchool: {...this.state.education.graduateSchool, [e.target.name]: stringDate } }
          }, () => { console.log(this.state) }) 
        }else{
          alert("Please insert a valid date")
      }
    }
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
          <Education {...this.state.education.graduateSchool} />
          <GraduateForm editEduGraduate = {this.editEduGraduate}/>
        </section>
        
      </div>

    )
  }
}

export default App;
