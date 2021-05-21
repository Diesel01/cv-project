import React from 'react';
import { Page, Text, Document, StyleSheet, Font, View, usePDF } from '@react-pdf/renderer';
import { fontsArray } from "./StyleSelector";


const PdfGenerator = props => {

    function getFont() {

        if (fontsArray.length < 3){

            //fallback font: Open Sans
            Font.register({
                family: "Open Sans",
                src: "font/OpenSansRegular.ttf",
                fontStyle: 'normal',
                fontWeight: 'normal'
            })
            
        } else {
        
            for (let i = 0; i < fontsArray.length; i++) {
                let font = fontsArray[i];
                Font.register({
                    family: font.family,
                    fonts: [{
                        src: font.src,
                        fontStyle: font.style,
                        fontWeight: font.weight,
                        format: 'truetype'
                    }]
                })
            }
        }
    }

    function createStyles() {

        getFont(); 

        const cssRules = document.getElementById('editableStyles').sheet.cssRules;

        const styleSheets = StyleSheet.create( {

            fullName: {
                fontFamily: cssRules[0].style.fontFamily !== "" ? cssRules[0].style.fontFamily : "Open Sans",
                fontSize: parseInt(cssRules[0].style.fontSize) ,
                fontWeight: cssRules[0].style.fontWeight !== "" ? parseInt(cssRules[0].style.fontWeight) : 400,
                fontStyle: cssRules[0].style.fontStyle,
                color: cssRules[0].style.color, 
                margin: "1.5%",  
            },

            educationList: {
                fontFamily: cssRules[1].style.fontFamily !== "" ?  cssRules[1].style.fontFamily : "Open Sans",
                fontSize: parseInt(cssRules[1].style.fontSize), 
                fontWeight: cssRules[1].style.fontWeight !== "" ? parseInt(cssRules[0].style.fontWeight) : 400,
                fontStyle: cssRules[1].style.fontStyle, 
                color: cssRules[1].style.color,
                margin: "1.5%",  
            },

            jobExpList: {
                fontFamily: cssRules[2].style.fontFamily !== "" ?  cssRules[2].style.fontFamily : "Open Sans",
                fontSize: parseInt(cssRules[2].style.fontSize), 
                fontWeight: cssRules[2].style.fontWeight !== "" ? parseInt(cssRules[0].style.fontWeight) : 400, 
                fontStyle: cssRules[2].style.fontStyle, 
                color: cssRules[2].style.color,
                margin: "1.5%",  
            }

        } )

        console.log(styleSheets); 
        console.log(cssRules[0].style.fontWeight)

        return styleSheets
    }

    const styling = createStyles(); 
    
    const {generalInfo, education, jobExp, componentOrder} = props; 

    const doc = (
        <Document>
        <Page>
            { componentOrder.map( (component) => {

                if (component === "generalInfo"){
                    return(
                        <View>
                            <Text style = {styling.fullName}>
                                {generalInfo.fullName}
                            </Text>

                            <Text style = {styling.fullName}>
                                Date of birth: {generalInfo.dateBirth}
                            </Text>

                            <Text style = {styling.fullName}>
                                Email:  {generalInfo.email}
                            </Text>

                            <Text style = {styling.fullName}>
                                Phone: {generalInfo.phone}
                            </Text>
                        </View>
                    )
                }

                if (component === 'education'){
                    return(
                        <View>
                            {education.items.map(object => {
                                return (
                                    <Text style={styling.educationList}>
                                        {object.level} in {object.course} at {object.institution}, from {object.startDate} until {object.endDate}
                                    </Text>
                                )
                            })}
                        </View>
                    )
                }

                if (component === 'jobExp'){
                    return(
                        <View>
                            {jobExp.items.map(object => {
                                return (
                                    <Text style={styling.jobExpList}>
                                        {object.positionTitle} in {object.company}, from {object.startDate} until {object.endDate}, responsible for {object.responsibleFor}
                                    </Text>
                                )
                            })}
                        </View>
                    )
                }    
            })}
        </Page>
        </Document>
    )

    const [instance] = usePDF({ document: doc })

    return (
        <a href={instance.url} target="_blank" rel="noreferrer">Open your CV as a PDF</a>
    )
}

export default PdfGenerator
