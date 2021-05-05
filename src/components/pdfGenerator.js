import React from 'react';
import { Page, Text, Document, StyleSheet, Font, View, usePDF } from '@react-pdf/renderer';
import { fontsArray } from "./StyleSelector";


const PdfGenerator = props => {

    function getFont() {
        for (let i = 0; i < fontsArray.length; i++) {
            let font = fontsArray[i];
            Font.register({
                family: font.family,
                fonts: [{
                    src: font.src,
                    fontStyle: font.style,
                    fontWeight: font.weight
                }]
            })
        }
    }

    function convertTransformValue(id){ 

        if (typeof id === "undefined"){
            return "translate(0pt, 0pt)" 
        }
        const fullHeightPX = 842; 
        const fullWidthPX = 595; 

        const xValuePX = id.x; 
        const yValuePX = id.y; 

        const xValuePercentage = xValuePX*0.75
        // (xValuePX / fullHeightPX)*100
        const yValuePercentage = yValuePX*0.75
        // (yValuePX / fullWidthPX)*100

        console.log(xValuePercentage)
        console.log(yValuePercentage)

        return `translate(${xValuePercentage}pt, ${yValuePercentage}pt)`

    }

    function createStyles() {

        getFont(); 

        const cssRules = document.getElementById('editableStyles').sheet.cssRules;

        const styleSheets = StyleSheet.create( {

            fullName: {
                fontFamily: cssRules[0].style.fontFamily !== "" ? cssRules[0].style.fontFamily : "Roboto",
                fontSize: parseInt(cssRules[0].style.fontSize),
                fontWeight: parseInt(cssRules[0].style.fontWeight),
                fontStyle: cssRules[0].style.fontStyle,
                color: cssRules[0].style.color, 
                transform: convertTransformValue(props.transformGeneralInfo)
            },

            educationList: {
                fontFamily: cssRules[1].style.fontFamily !== "" ?  cssRules[1].style.fontFamily : "Roboto",
                fontSize: parseInt(cssRules[1].style.fontSize), 
                fontWeight: parseInt(cssRules[1].style.fontWeight), 
                fontStyle: cssRules[1].style.fontStyle, 
                color: cssRules[1].style.color,
                transform: convertTransformValue(props.transformEducation)
            },

            jobExpList: {
                fontFamily: cssRules[2].style.fontFamily !== "" ?  cssRules[2].style.fontFamily : "Roboto",
                fontSize: parseInt(cssRules[2].style.fontSize), 
                fontWeight: parseInt(cssRules[2].style.fontWeight), 
                fontStyle: cssRules[2].style.fontStyle, 
                color: cssRules[2].style.color,
                transform: convertTransformValue(props.transformJobExp)
            }

        } )

        console.log(styleSheets)

        return styleSheets
    }

    const styling = createStyles()
    
    const doc = (

        <Document>
            <Page style = { {width: "595px", height: "842px"} } >

                <View>
                    <Text style = {styling.fullName}>
                        {props.generalInfo.fullName}

                        Date of birth: {props.generalInfo.dateBirth}

                        Email:  {props.generalInfo.email}

                        Phone: {props.generalInfo.phone}
                    </Text>
                </View>

                <View>
                    {props.education.map(object => {
                        return (
                            <Text style={styling.educationList}>
                                {object.level} in {object.course} at {object.institution}, from {object.startDate} until {object.endDate}
                            </Text>
                        )
                    })}
                </View>

                <View>
                    {props.jobExp.map(object => {
                        return (
                            <Text style={styling.jobExpList}>
                                {object.positionTitle} in {object.company}, from {object.startDate} until {object.endDate}, responsible for {object.responsibleFor}
                            </Text>
                        )
                    })}
                </View>

            </Page>
        </Document>
    )

    const [instance] = usePDF({ document: doc })

    return (
        <a href={instance.url} target="_blank" rel="noreferrer">Open your CV as a PDF</a>
    )
}

export default PdfGenerator
