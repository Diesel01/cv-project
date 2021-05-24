import React from 'react';
import "../styles/Forms.css";

let fontsArray = []
export default class StyleSelector extends React.Component{ 
    constructor(props){ 
        super(props); 
        
        this.state = { 
            fonts: [], 
            selectedFont: {}, 
            fontVariants: [], 
        }

        this.applyFont = this.applyFont.bind(this)
        this.fontHandler = this.fontHandler.bind(this)
        this.displayFontVariant = this.displayFontVariant.bind(this)

        this.colorHandler = this.colorHandler.bind(this)
        this.sizeHandler = this.sizeHandler.bind(this)
    }

    async componentDidMount(){ 
        let data = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAfSLRqUkls5peRZBi6YmLucrPIDxJ_zLM&sort=popularity", { mode: 'cors' })
        try { 
            let dataJson = await data.json(); 
            let families = dataJson.items; 
                families.length = 25; 
            this.setState({
                fonts: families
            })
        }
        catch { throw console.error() }  
    }

    fontHandler(font){
        this.setState({ 
            selectedFont: font, 
            fontVariants: font.variants
        })
    }

    displayFontVariant(variant){ 
        if (variant === "regular" || variant === "italic"){ 
            return { __html: variant[0].toUpperCase() + variant.slice(1) }

        } else { 
            let weight = variant.slice(0, 3) 
            let italic = variant.slice(3)
            return { __html: `Weight: ${weight} ${italic} `}
        }
    }

    applyFont(variant, id){ 
        let fam = this.state.selectedFont.family.replace(/\s+/g, "+");

        let fontLink = document.getElementById("fontLink")
        let href = fontLink.href;

        let italic; 
        let url; 
        let weight;  
        
        if (variant.slice(3) === "italic"){
            if ( parseInt(variant.slice(0, 3)) ){ 
                italic = true
                weight = variant.slice(0, 3); 
                url = href.slice(0, 33) + `?family=${fam}:ital,wght@1,${weight}&` + href.slice(34)
                fontLink.href = url; 
            }
            
        } else{ 
            if ( parseInt(variant.slice(0, 3)) ){ 
                italic = false
                weight = variant.slice(0, 3); 
                url = href.slice(0, 33) + `?family=${fam}:wght@${weight}&` + href.slice(34)
                fontLink.href = url; 

            }else { 
                if (variant === "italic"){
                    italic = true
                    weight = "400"
                    url = href.slice(0, 33) + `?family=${fam}:ital@1&` + href.slice(34)
                    fontLink.href = url; 

                } else{ 
                    italic = false
                    weight = "400"
                    url = href.slice(0, 33) + `?family=${fam}&` + href.slice(34)
                    fontLink.href = url; 
                }
            }
        }

        let cssRules = document.getElementById('editableStyles').sheet.cssRules; 

        for (let i = 0; i < cssRules.length; i++){ 
            if (cssRules[i].selectorText === `.${id}`){ 
                cssRules[i].style.fontFamily = this.state.selectedFont.family; 
                cssRules[i].style.fontWeight = weight; 
                
                italic ? cssRules[i].style.fontStyle = "italic" : cssRules[i].style.fontStyle = "normal"
            }
        }

        let variantSrc; 
        for (let obj in this.state.selectedFont.files){ 
            if (obj === variant){ 
                variantSrc = this.state.selectedFont.files[obj]
            } 
        }
        
        let fontObj = {
            elementId: id, 
            family: this.state.selectedFont.family,
            src: variantSrc, 
            style: "", 
            weight: parseInt(weight)
        }
        italic ? fontObj.style = "italic" : fontObj.style = "normal";
        
        fontsArray.push(fontObj); 
        console.log(fontsArray)        
    }
    
    colorHandler(color, id){ 
        let cssRules = document.getElementById('editableStyles').sheet.cssRules; 
        for (let i = 0; i < cssRules.length; i++){ 
            if (cssRules[i].selectorText === `.${id}`){ 
                cssRules[i].style.color = color
            }
        }
    }

    sizeHandler(size, id){ 
        let cssRules = document.getElementById('editableStyles').sheet.cssRules; 
        for (let i = 0; i < cssRules.length; i++){ 
            if (cssRules[i].selectorText === `.${id}`){ 
                cssRules[i].style.fontSize = `${size}pt`
            }
        }
    }

    render(){ 
        return(
            <div className = "form">
                {/* <div id = "fontSelector"> */}
                    <div>
                        <label htmlFor = "fonts">Choose a font: </label>
                        <select name = "fonts" id = "fonts">
                            {this.state.fonts.map( font => { 
                                return (
                                    <option key = {`${font.family}`} value = {`${font.family}`} onClick = {() => { this.fontHandler(font) }}>
                                        {font.family} 
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor = "fontVariants"> Choose a font variant: </label>
                        <select name = 'fontVariants' id = 'fontVariants'>
                            {this.state.fontVariants.map( variant => { 
                                return (
                                    <option 
                                        key = {variant}
                                        value = {variant} 
                                        onClick = {() => { this.applyFont(variant, this.props.elementId) }}
                                        dangerouslySetInnerHTML =  { this.displayFontVariant(variant) }
                                    />
                                )
                            })}
                        </select>
                    </div>
                {/* </div> */}
            
                <div> 
                    <label htmlFor = "colorInput" name = "color">Select a color: </label>
                    <input id = "colorInput" name = "color" type = 'color' 
                        onChange = { ()=>{
                            let color = document.getElementById("colorInput").value
                            this.colorHandler(color, this.props.elementId)
                        }  
                    }>    
                    </input>
                </div>

                <div> 
                    <label htmlFor = "sizeInput" name = "size">Select font size: </label>
                    <input id = "sizeInput" name = "size" type = 'range' min = "5" max = "60" 
                        onChange = { ()=>{
                            let size = document.getElementById("sizeInput").value
                            this.sizeHandler(size, this.props.elementId)
                        } 
                    }>
                    </input>
                </div>
            </div>
        )
    }
}

export { fontsArray }