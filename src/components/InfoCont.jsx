function InfoCont({principalInfo, valTabla, setValTabla, volverAntPag , setPageForm}) {

    function prepareValTabla(){

        //Se convierten las variables de la función objetivo en negativo 
        let newValTabla={...valTabla}
        let newFuncObj = valTabla.funcObj.map((val)=>{
            return val * -1
        })


        //Se agregan a la función objetivo los valores de las variables de holgura y el resultado
        
        for(let i=0; i <= principalInfo.rest; i++){
            newFuncObj.push(0)
        }
        
        newValTabla={...newValTabla,funcObj:[...newFuncObj]}

        


        //Se agregan a las restricciones los valores de las variables de holgura
    
        for(let i=0; i < principalInfo.rest; i++){
            let newRest=[...valTabla["rest" + i]]
            let valFin = valTabla["rest" + i][principalInfo.varDec]

            for(let j=0; j < principalInfo.rest; j++){
                if(j==0){
                    newRest[principalInfo.varDec]= j==i ? 1 : 0
                }else{
                    newRest.push(j==i ? 1 : 0) 
                }
            }
            newRest.push(valFin)

            newValTabla={...newValTabla, ["rest" + i]: [...newRest]}
        }

        setPageForm(4)

        setValTabla({...newValTabla})
    }



  return (
    <div className="container">
            <img src="./img/arrow-left.png"  className="volver" onClick={volverAntPag}/>
            <div id="div_info">
                <div id="left_info">
                    <span>Max Z ={" "}
                        {valTabla.funcObj.map((val, i)=>{
                            return(
                                <span key={i}>
                                    {val != 1 ? val : ""}X<sub>{i+1}</sub>{principalInfo.varDec!=i+1 ? "  +  " : ""}
                                </span>
                            )
                        })}
                    </span>
                    <span>Sujeto a:</span>
                    <ul>
                        {
                            Array.from({ length: principalInfo.rest }, (_, i) => i + 1).map((variable, indexRest)=>{
                                return(
                                    <li key={indexRest}>
                                        {
                                            valTabla["rest" + indexRest].map((val, i)=>{
                                                return(
                                                    <span key={i}>
                                                        {val != 1 ? val : ""}{principalInfo.varDec>i+1 ? <span>X<sub>{i+1}</sub>{"  +  "}</span> : principalInfo.varDec==i+1 ? <span>X<sub>{i+1}</sub>{"  ≤  "}</span> : ""}
                                                    </span>
                                                )
                                            })
                                        }
                                        
                                    </li>
                                ) 
                            })
                        }
                        <li>
                            {
                                Array.from({ length: principalInfo.varDec }, (_, i) => i + 1).map((variable, index)=>{
                                    return(
                                        <span key={index}>
                                        X<sub>{index+1}</sub>{index+1!=principalInfo.varDec ? ", " : " ≥ "}
                                        </span>
                                    ) 
                                })
                            }
                            <span>0</span>
                        </li>
                    </ul>
                </div>

                <div id="center_info">
                    <img src="./img/arrow-right.png" style={{width:"150px", height:"80px",position:"relative", top:"5px"}}/>
                </div>

                <div id="right_info">
                    <span>Max Z ={" "}
                        {valTabla.funcObj.map((val, i)=>{
                            return(
                                <span key={i}>
                                    {val != 1 ? val : ""}X<sub>{i+1}</sub>  +{" "}  
                                </span>
                            )
                        })}
                        {
                            Array.from({ length: principalInfo.rest }, (_, i) => i + 1).map((variable, indexRest)=>{
                                return(
                                    <span key={indexRest}>0S<sub>{indexRest+1}</sub>{indexRest+1!=principalInfo.rest ? "  +  " : ""}</span>
                                ) 
                            })
                        }
                    </span>
                    <span>Sujeto a:</span>
                    <ul>
                        {
                            Array.from({ length: principalInfo.rest }, (_, i) => i + 1).map((variable, index)=>{
                                return(
                                    <li key={index}>
                                        {
                                            valTabla["rest" + index].map((val, i)=>{
                                                return(
                                                    <span key={i}>
                                                        {val != 1 ? val : ""}{

                                                        principalInfo.varDec>i+1 ? <span>X<sub>{i+1}</sub>{"  +  "}</span> : principalInfo.varDec==i+1 ? <span>X<sub>{i+1}</sub>{"  +  "}S<sub>{index+1}</sub>{"  =  "}</span> : ""
                                                        
                                                        }
                                                    </span>
                                                )
                                            })
                                        }
                                        
                                    </li>
                                ) 
                            })
                        }
                        <li>
                            {
                                Array.from({ length: principalInfo.varDec }, (_, i) => i + 1).map((variable, index)=>{
                                    return(
                                        <span key={index}>
                                        X<sub>{index+1}</sub>{", "}
                                        </span>
                                    ) 
                                })
                            }

                            {
                                Array.from({ length: principalInfo.rest }, (_, i) => i + 1).map((variable, indexRest)=>{
                                    return(
                                        <span key={indexRest}>S<sub>{indexRest+1}</sub>{indexRest+1!=principalInfo.rest ? ", " : " ≥ "}</span>
                                    ) 
                                })
                            }
                            <span>0</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <button type='button' className="btn_sig" onClick={prepareValTabla}>Resolver</button>
        </div>
  )
}

export default InfoCont