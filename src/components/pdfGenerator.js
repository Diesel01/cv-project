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
        const fullHeightPX = 1403; 
        const fullWidthPX = 992; 

        const xValuePX = id.x; 
        const yValuePX = id.y; 

        const xValuePercentage = (xValuePX / fullWidthPX)*100

        const yValuePercentage = (yValuePX / fullHeightPX)*100

        console.log(xValuePercentage)
        console.log(yValuePercentage)

        return `translate(${xValuePercentage}%, ${yValuePercentage}%)` // either this or `translate(${xValuePercentage}pt, ${yValuePercentage}pt)`. The difference isn't huge

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
                margin: "1.5%",  
                transform: convertTransformValue(props.transformGeneralInfo)
            },

            educationList: {
                fontFamily: cssRules[1].style.fontFamily !== "" ?  cssRules[1].style.fontFamily : "Roboto",
                fontSize: parseInt(cssRules[1].style.fontSize), 
                fontWeight: parseInt(cssRules[1].style.fontWeight), 
                fontStyle: cssRules[1].style.fontStyle, 
                color: cssRules[1].style.color,
                margin: "1.5%",  
                transform: convertTransformValue(props.transformEducation)
            },

            jobExpList: {
                fontFamily: cssRules[2].style.fontFamily !== "" ?  cssRules[2].style.fontFamily : "Roboto",
                fontSize: parseInt(cssRules[2].style.fontSize), 
                fontWeight: parseInt(cssRules[2].style.fontWeight), 
                fontStyle: cssRules[2].style.fontStyle, 
                color: cssRules[2].style.color,
                margin: "1.5%",  
                transform: convertTransformValue(props.transformJobExp)
            }

        } )

        console.log(styleSheets)

        return styleSheets
    }

    const styling = createStyles()
    
    const doc = (

        <Document>
            <Page 
                // style = { { height: "992px", width: "1403px" } } 
            >

                <View>
                    <Text style = {styling.fullName}>
                        {props.generalInfo.fullName}
                    </Text>

                    <Text style = {styling.fullName}>
                        Date of birth: {props.generalInfo.dateBirth}
                    </Text>

                    <Text style = {styling.fullName}>
                        Email:  {props.generalInfo.email}
                    </Text>

                    <Text style = {styling.fullName}>
                        Phone: {props.generalInfo.phone}
                    </Text>
                </View>

                <View>
                    {props.education.map(object => {
                        return (
                            <Text style={styling.educationList} debug>
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
