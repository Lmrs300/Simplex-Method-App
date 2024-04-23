import {toast} from 'react-toastify'

function SimplexForm2({principalInfo, valTabla, setValTabla, volverAntPag, setPageForm}) {

    function handleSecondInputs(e){
        const {name, id, value}=e.target

        if(name in valTabla){
            let newArr=[...valTabla[name]]

            newArr[id] = parseFloat(value)

            setValTabla({...valTabla, [name]: newArr})
        }else{
            let auxObj={...valTabla, [name]:[]}

            let newArr=[...auxObj[name]]

            newArr[id] = parseFloat(value)

            setValTabla({...auxObj, [name]: newArr})
        }
    }

    function handleSecondForm(e){
        e.preventDefault()

        let inputs = e.target.querySelectorAll("#form2 input")

        let fail=false

        inputs.forEach((input)=>{
            if(input.value==""){
                fail=true
            }
        })

        if(fail==true){
            return toast("Error: Todos los campos deben ser llenados.",{
                type: "warning",
                autoClose: 3000,
                pauseOnHover: false,
                theme: 'dark'
              })
        }else{
            e.target.reset()
            setPageForm(3)
        }
    }

  return (
    <form action="#" id="form2" style={{alignItems:"center"}} onSubmit={handleSecondForm}>
            <img src="./img/arrow-left.png"  className="volver" onClick={volverAntPag}/>
        <div className="div_func">
            <span>
            Función:
            </span>
            
            {
                Array.from({ length: principalInfo.varDec }, (_, i) => i + 1).map((variable, index)=>{
                    return(
                    <span key={index} className="span_func">
                    <input step="0.0000000001" type="number" name="funcObj" id={index} style={{width:"120px"}} onChange={handleSecondInputs}/><span style={{marginLeft:"5px"}}>X<sub>{index+1}</sub>{index+1 != principalInfo.varDec ? "   +" : ""}</span>
                    </span>
                    ) 
                })
            }
        </div>

        <ul className="ul_rest">
        {
            Array.from({ length: principalInfo.rest }, (_, i) => i + 1).map((variable, indexRest)=>{
                return (
                    <li key={indexRest}>
                        {
                            Array.from({ length: principalInfo.varDec }, (_, i) => i + 1).map((variable, index)=>{
                                return(
                                <span key={index}>
                                <input step="0.000000001" type="number" name={"rest" + indexRest} id={index} style={{width:"120px"}} onChange={handleSecondInputs}/><span style={{marginLeft:"5px"}}>X<sub>{index+1}</sub>{index+1 != principalInfo.varDec ? "    +" : "    ≤"}</span>
                                </span>
                                ) 
                            })
                        }
                            <input step="0.0000000001" type="number" name={"rest" + indexRest} id={principalInfo.varDec} style={{width:"120px"}} onChange={handleSecondInputs}/>
                        
                    </li>
                )
            })

                
            }
        </ul>
        <div>
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
        </div>
        <button type='submit' className="btn_sig">Siguiente</button>
    </form>
  )
}

export default SimplexForm2