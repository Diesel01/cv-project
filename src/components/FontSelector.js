import React from 'react';

// Put items of Google fonts api into an array and map them into a radio input. 
// Put the imtes in a collapsible div and, after one is selected, display italics and weight options. 
    // Maybe do another map iteration with this.state.fontVariants, instead of assigning values to range and radio inputs?
// The inputs should be put into the 'data' url. 

export default class FormSelector extends React.Component{ 
    constructor(){ 
        super(); 
        this.state = { 
            fonts: [], 
            fontVariants: []
        }
        this.applyFont = this.applyFont.bind(this)
        this.fontHandler = this.fontHandler.bind(this)
    }

    async componentDidMount(){ 
        let data = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAfSLRqUkls5peRZBi6YmLucrPIDxJ_zLM&sort=popularity", { mode: 'cors' })
        
        try { 
            let dataJson = await data.json(); 
            let families = dataJson.items; 
                families.length = 20; 
            this.setState({
                fonts: families
            })
        }
        catch { throw console.error() }  
    }

    fontHandler(font){
        let variants = font.variants;

        this.setState({ 
            fontVariants: variants
        }, () => {console.log(this.state.fontVariants)})

        let weightInput = document.getElementById("weightInput");
            weightInput.min = parseInt(variants[0]); 
            weightInput.max = parseInt(variants[variants.length-1]);
        
        let italicsForm = document.getElementById("italicsForm"); 
            if (variants.includes("italic") == false){
                italicsForm.hidden = true
            }
    }

    applyFont(id){ 
        let family = document.getElementById("fontInput").value; 
        let weight = document.getElementById("weightInput").value; 
        let italic = document.getElementById("italicInput").value;

        let element = document.getElementById(`${id}`); 
        let text = element.innerHTML

        let input = family.replace(/\s+/g, "+").trim();
        let url = `https://fonts.googleapis.com/css2?family=${input}:ital,wght@0,${weight}&display=swap;text=${text}`
        
        if (document.getElementById(`font-for-${id}`) === null){
            let style = document.createElement("link");
                style.rel = "stylesheet"; 
                style.href = url; 
                style.id = `font-for-${id}`
            document.head.appendChild(style)
        }else{ 
            let style = document.getElementById(`font-for-${id}`); 
            style.href = url; 
        }
          
        element.style.fontFamily = `${family}`
        element.style.fontWeight = weight
    }   

    render(){ 
        return(
            <>
                {this.state.fonts.map( (font, index) => { 
                    return (
                        <div>  
                            <input name = "font" id = {font.family} type = "radio" key = {`input-${index}`}
                                onClick = {() => { this.fontHandler(font) }}
                            >
                            </input> 

                            <label name = "font" htmlFor = {font.family} key = {`label-${index}`}>
                                {font.family}
                            </label>
                        </div>
                    )
                })}

                <input type = "number" id = "weightInput" min = "100" max = "900" step = "100" defaultValue = "400"/>

                <div id = "italicsForm">
                    <label name = 'italics' htmlFor = "italics">Italics?</label>
                    <input name = 'italics' type = "radio" id = "italics" value = {true}></input>
                    <input name = 'italics' type = "radio" id = "italics" value = {false}></input>
                </div>
                    
                <button onClick = { 
                    ()=>{ this.applyFont("fullName") }
                } />
            </>
        )
    }
}