import { useState } from "react"
import {toast} from 'react-toastify'
import InfoCont from "./InfoCont"
import SimplexForm2 from "./SimplexForm2"
import TableList from "./TableList"

function SimplexForm1() {

    const [principalInfo, setPrincipalInfo]=useState({
        varDec: "",
        rest: "",
    })

    const [pageForm, setPageForm]=useState(1)

    const [valTabla, setValTabla]=useState({
        funcObj:[]
    })


    function handlePrincipalInputs(e){
        const {name, value} = e.target
        setPrincipalInfo({...principalInfo, [name]: value})

    }

    function handlePrincipalForm(e){
        e.preventDefault()
            
        if(principalInfo.varDec=="" || principalInfo.rest==""){
            return toast("Error: Todos los campos deben ser llenados.",{
                type: "warning",
                autoClose: 3000,
                pauseOnHover: false,
                theme: 'dark'
              })
        }

        e.target.reset()
        setPageForm(2)

    }

    function volverAntPag(){
        setPageForm(pageForm-1)
    }

  return (
    <>
    {
        pageForm==1 ?
        <>
        <form action="#" style={{width:"fit-content"}} onSubmit={handlePrincipalForm}>
            <label htmlFor="varDec">
                <span>Cantidad de variables de decisión:</span>
            <input type="number" name="varDec" id="varDec" min="2" max="6" onChange={handlePrincipalInputs} value={principalInfo.varDec}/>
            </label>
            <label htmlFor="rest">
                <span>Cantidad de restricciones:</span>
            <input type="number" name="rest" id="rest" min="2" max="6" onChange={handlePrincipalInputs} value={principalInfo.rest}/>
            </label>
            <button type='submit' className="btn_sig">Siguiente</button>
        </form>

        <div style={{textAlign:"center", userSelect:"none"}}><h1>Creado por Luis Romero</h1><h1>C.I: 29.850.292</h1></div>
        </>
        :
        ""
    }
    

    { pageForm==2 ?
        <SimplexForm2 principalInfo={principalInfo} valTabla={valTabla} setValTabla={setValTabla} volverAntPag={volverAntPag} setPageForm={setPageForm}/>
    :
    ""
    }

    {
        pageForm==3 ?
        <InfoCont principalInfo={principalInfo} valTabla={valTabla} setValTabla={setValTabla} volverAntPag={volverAntPag} setPageForm={setPageForm}/>
        :
        ""
    }

{
        pageForm==4 ?
        <TableList principalInfo={principalInfo} setPrincipalInfo={setPrincipalInfo} valTabla={valTabla} setValTabla={setValTabla} setPageForm={setPageForm}/>
        :
        ""
    }
    
    </>
  )
}

export default SimplexForm1