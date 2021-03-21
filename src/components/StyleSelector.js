import React from 'react';

export default class StyleSelector extends React.Component{ 
    constructor(props){ 
        super(props); 
        
        this.state = { 
            fonts: [], 
            selectedFamily: "", 
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
            selectedFamily: font.family, 
            fontVariants: font.variants
        })
    }

    displayFontVariant(variant){ 
        if (variant === "regular" || variant === "italic"){ 
            return { __html: variant[0].toUpperCase() + variant.slice(1) }

        } else { 
            let weight = variant.slice(0, 3) 
            let italic = variant.slice(3)
            return { __html: `Weight: ${weight}; ${italic} `}
        }
    }

    applyFont(variant, id){ 
        let fam = this.state.selectedFamily.replace(/\s+/g, "+");

        let fontLink = document.getElementById("fontLink")
        let href = fontLink.href;

        let url; 
        let weight;  
        
        if (variant.slice(3) === "italic"){
            if ( parseInt(variant.slice(0, 3)) ){ 
                weight = variant.slice(0, 3); 
                url = href.slice(0, 33) + `?family=${fam}:ital,wght@1,${weight}&` + href.slice(34)
                fontLink.href = url; 
            }

        } else{ 
            if ( parseInt(variant.slice(0, 3)) ){ 
                weight = variant.slice(0, 3); 
                url = href.slice(0, 33) + `?family=${fam}:wght@${weight}&` + href.slice(34)
                fontLink.href = url; 
            }else { 
                if (variant === "italic"){
                    url = href.slice(0, 33) + `?family=${fam}:ital@1&` + href.slice(34)
                    fontLink.href = url; 
                } else{ 
                    url = href.slice(0, 33) + `?family=${fam}&` + href.slice(34)
                    fontLink.href = url; 
                }
            }
        }

        let element = document.getElementById(`${id}`); 
        element.style.fontFamily = `${this.state.selectedFamily}`
        element.style.fontWeight = weight
    }   

    colorHandler(id){ 
        let element = document.getElementById(`${id}`); 
        element.style.color = document.getElementById("colorInput").value; 
    }

    sizeHandler(id){ 
        let element = document.getElementById(`${id}`); 
        element.style.fontSize = `${document.getElementById("sizeInput").value}%`; 
    }

    render(){ 
        return(
            <div>
                <div id = "fontSelector">
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

                    {this.state.fontVariants.map( (variant, index) => { 
                        return (
                            <div>  
                                <input name = "font" id = {variant} type = "radio" key = {`inputVariant-${index}`}
                                    onClick = {() => { this.applyFont(variant, this.props.elementId) }}
                                >
                                </input> 

                                <label name = "font" htmlFor = {variant} id = {`label-${variant}`} key = {`labelVariant-${index}`}
                                    dangerouslySetInnerHTML =  { this.displayFontVariant(variant) }>
                                </label>
                            </div>
                        )
                    })}
                </div>
            
                <div> 
                    <label htmlFor = "colorInput" name = "color">Select a color:</label>
                    <input id = "colorInput" name = "color" type = 'color' onChange = { ()=>{this.colorHandler(this.props.elementId)} }></input>
                </div>

                <div> 
                    <label htmlFor = "sizeInput" name = "size">Select font size:</label>
                    <input id = "sizeInput" name = "size" type = 'range' min = "5" max = "500" onChange = { ()=>{this.sizeHandler(this.props.elementId)} }></input>
                </div>
            </div>
        )
    }
}