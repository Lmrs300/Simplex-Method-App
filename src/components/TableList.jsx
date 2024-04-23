import { useEffect, useState, useRef } from "react"
import Table from "./Table"


function TableList({principalInfo, setPrincipalInfo, valTabla, setValTabla, setPageForm}) {


    const pivote = useRef({
        pivCol:[],
        pivRow:[],
        piv:0
    })

    valTabla.indexPivCol=getPivColInit()

    valTabla.indexPivRow=getPivRowInit()

    pivote.current={
        pivCol:[],
        pivRow:[],
        piv:0
    }

    const [finValTabla, setFinValTabla]=useState({...valTabla})

    const [listValTabla, setListValTabla]=useState([])

    let newFinalVarDec={
        var:[],
        subI:[],
        val:[],
    }

    for (let i=0; i<principalInfo.varDec; i++){
        newFinalVarDec={...newFinalVarDec, var:[...newFinalVarDec.var, "X"]}
        newFinalVarDec={...newFinalVarDec, subI:[...newFinalVarDec.subI, i+1]}
        newFinalVarDec={...newFinalVarDec, val:[...newFinalVarDec.val, 0]}
    }
    
    const FinalVarDec=useRef({...newFinalVarDec})

    function initVarBasics(){
        let newVarBasics={
            var:[],
            subI:[]
        }
    
        for (let i=0; i<principalInfo.rest; i++){
            newVarBasics={...newVarBasics, var:[...newVarBasics.var, "S"]}
            newVarBasics={...newVarBasics, subI:[...newVarBasics.subI, i+1]}
        }

        return newVarBasics
    }
    
    let newVarBasics = initVarBasics()

    const [varBasics, setVarBasics]=useState({...newVarBasics})

    

    function reset(){
        setPageForm(1)
        setValTabla({
            funcObj:[]
        })
        setPrincipalInfo({
            varDec: "",
            rest: "",
        })

    }

    function delZero(num){
        let newNum=num.toString()

        while(newNum[-1]=="0"){
            newNum = newNum.slice(0,-1)
        }

        return Number.parseFloat(newNum) 
    }

    function getPivColInit(){
        let minFuncObj=Math.min(...valTabla.funcObj)

        let indexPivCol=valTabla.funcObj.indexOf(minFuncObj)

        pivote.current.pivCol=[valTabla.funcObj[indexPivCol]]
        
        for (let i=0; i<principalInfo.rest; i++){
            pivote.current.pivCol=[...pivote.current.pivCol, valTabla["rest" + i][indexPivCol]]
        }

        return indexPivCol
    }

    function getPivRowInit(){
        let divSol=[]

        for(let i=1; i<pivote.current.pivCol.length; i++){

            divSol.push(valTabla["rest"+ (i-1)][valTabla["rest"+ (i-1)].length - 1] / pivote.current.pivCol[i])
        }

        let minDivSol=Math.min(...divSol)

        let indexPivRow=0

        for(let i=1; i<pivote.current.pivCol.length; i++){
            if(valTabla["rest"+ (i-1)][valTabla["rest"+ (i-1)].length - 1] == minDivSol * pivote.current.pivCol[i]){
                indexPivRow=i-1
                pivote.current.pivRow=[...valTabla["rest"+ (i-1)]]
                break
            }
        }

        return indexPivRow
    }

    function getPivCol(){
        let minFuncObj=Math.min(...finValTabla.funcObj)

        let indexPivCol=finValTabla.funcObj.indexOf(minFuncObj)

        pivote.current.pivCol=[finValTabla.funcObj[indexPivCol]]
        
        for (let i=0; i<principalInfo.rest; i++){
            pivote.current.pivCol=[...pivote.current.pivCol, finValTabla["rest" + i][indexPivCol]]
        }

        return indexPivCol
    }

    function getPivRow(){
        let divSol=[]

        for(let i=1; i<pivote.current.pivCol.length; i++){

            divSol.push(finValTabla["rest"+ (i-1)][finValTabla["rest"+ (i-1)].length - 1] / pivote.current.pivCol[i])
        }

        let minDivSol=Math.min(...divSol)

        let indexPivRow=0

        for(let i=1; i<pivote.current.pivCol.length; i++){
            if(finValTabla["rest"+ (i-1)][finValTabla["rest"+ (i-1)].length - 1] == minDivSol * pivote.current.pivCol[i]){
                indexPivRow=i-1
                pivote.current.pivRow=[...finValTabla["rest"+ (i-1)]]
                break
            }
        }

        return indexPivRow
    }

    function algorithmSimplex(){
        
        let indexPivCol = getPivCol()

        let indexPivRow = getPivRow()
    
        //Elemento pivote
        pivote.current.piv=finValTabla["rest" + indexPivRow][indexPivCol]


        //Dividir la fila pivote por el elemento pivote 

        pivote.current.pivRow=pivote.current.pivRow.map((val)=>{
            return val/pivote.current.piv
        })

        pivote.current.pivCol[indexPivRow+1]/=pivote.current.piv

        //agregar los valores nuevos de la fila pivote a la tabla

        let newFinValTabla={...finValTabla}

        newFinValTabla["rest"+ indexPivRow]=[...pivote.current.pivRow]

        newFinValTabla.indexPivCol=indexPivCol

        newFinValTabla.indexPivRow=indexPivRow


        //cambiar variables básicas

        let newVarBasics={...varBasics}

        newVarBasics.var[indexPivRow]="X"

        newVarBasics.subI[indexPivRow]=indexPivCol+1

        let auxListValTabla=[...listValTabla, {...newFinValTabla, "varBasics":{
           "var": [...newVarBasics.var],
           "subI": [...newVarBasics.subI]
        }}]

        //cambiar las demás filas

        let newFuncObj = pivote.current.pivRow.map((val, i)=>{

            return ((pivote.current.pivCol[0] * -1) * val) + finValTabla.funcObj[i]
        })

        newFinValTabla.funcObj=[...newFuncObj]

        pivote.current.pivCol[0] = 0
        
        for(let i=0; i<pivote.current.pivCol.length-1; i++){
            if(pivote.current.pivCol[i+1]==0 || i==indexPivRow){
                continue
            }else{
                let newRest=pivote.current.pivRow.map((val, index)=>{

                    return ((pivote.current.pivCol[i+1] * -1) * val) + finValTabla["rest"+i][index]
                })
    
                pivote.current.pivCol[i+1]=0
    
                newFinValTabla["rest"+i]=[...newRest]
            }

        }

        auxListValTabla=[...auxListValTabla, {...newFinValTabla, "varBasics":{
            "var": [...newVarBasics.var],
            "subI": [...newVarBasics.subI]
         }}]

        setListValTabla([...auxListValTabla])

        setFinValTabla({...newFinValTabla})

        setVarBasics({...newVarBasics})
    }

    useEffect(()=>{
        let end=true
        finValTabla.funcObj.map((val)=>{
            if(val<0){
                end=false
                return algorithmSimplex()
            }      
        })

        if(end==true){
            //listValTabla.pop()
            setListValTabla([...listValTabla])


            //Se llena el objeto de los resultados finales de las variables de decision

            Array.from({ length: principalInfo.rest }, (_, i) => i + 1).map((variable, index)=>{
                Array.from({ length: principalInfo.rest }, (_, i) => i + 1).map((variable, i)=>{
                    if(varBasics.var[index]==FinalVarDec.current.var[i] && varBasics.subI[index]==FinalVarDec.current.subI[i]){
                        
                        FinalVarDec.current.val[i]= finValTabla["rest"+index][finValTabla["rest"+index].length-1]
                    }
                })
            })
        }
    },[finValTabla])

    

  return (
    <div id="div_table_list">
        <h2 style={{marginTop:"30px", marginBottom:"-20px"}}>Tabla principal</h2>
        <Table principalInfo={principalInfo} valTabla={valTabla} varBasics={initVarBasics()}/>

        <h2 style={{marginBottom:"-40px"}}>Tablas intermedias</h2>
        <ul>
            {

                listValTabla.map((tab, i)=>{
                    return(<li key={i}>
                        <h3 style={{marginTop:"40px"}}>Iteración N° {i+1}</h3>
                        <Table principalInfo={principalInfo} valTabla={tab} varBasics={tab.varBasics}/>
                    </li>)
                })
                
            }
        </ul>

        <h2 style={{marginTop:"10px", marginBottom:"-20px"}}>Tabla Final</h2>

        <table>
                <thead>
                    <tr>
                        <th>Variables básicas</th>
                        <th>Z</th>
                        {
                            Array.from({ length: principalInfo.varDec }, (_, i) => i + 1).map((variable, index)=>{
                                
                                return <th key={index}>X<sub>{index+1}</sub> </th> 
                            })
                        }
                        {
                            Array.from({ length: principalInfo.rest }, (_, i) => i + 1).map((variable, index)=>{

                                return <th key={index}>S<sub>{index+1}</sub></th>
                            })
                        }
                        <th>Solución</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Z</th>
                        <td>1</td>
                        {
                            finValTabla.funcObj.map((val, i)=>{
                                
                                return <td key={i}>{Number.isInteger(val) ? val : delZero(val.toFixed(3))}</td>
                            })
                        }
                    </tr>
                    
                    {
                        Array.from({ length: principalInfo.rest }, (_, i) => i + 1).map((variable, index)=>{
                            return(
                                <tr key={index}>
                                    <th>{varBasics.var[index]}<sub>{varBasics.subI[index]}</sub></th>
                                    <td>0</td>
                                    {
                                        finValTabla["rest" + index].map((val, i)=>{
                                            return <td key={i}>{Number.isInteger(val) ? val : delZero(val.toFixed(3))}</td>
                                        })
                                    }
                                </tr>

                                    ) 
                                })
                    }
                    
                </tbody>
            </table>

        <div id="solucion">
                <span>La solución optima es Z = {Number.isInteger(finValTabla.funcObj[finValTabla.funcObj.length-1]) ? finValTabla.funcObj[finValTabla.funcObj.length-1] : delZero(finValTabla.funcObj[finValTabla.funcObj.length-1].toFixed(3))}</span>
                {
                    // Array.from({ length: principalInfo.rest }, (_, i) => i + 1).map((variable, index)=>{


                    //     return(
                            
                    //         <span key={index}>{varBasics.var[index]}<sub>{varBasics.subI[index]}</sub> = {Number.isInteger(finValTabla["rest"+index][finValTabla["rest"+index].length-1]) ? finValTabla["rest"+index][finValTabla["rest"+index].length-1] : finValTabla["rest"+index][finValTabla["rest"+index].length-1].toFixed(3)}</span>
                            

                    //     ) 
                    // })
                    
                    Array.from({ length: principalInfo.varDec }, (_, i) => i + 1).map((variable, index)=>{
                        return(
                            <span key={index}>{FinalVarDec.current.var[index]}<sub>{FinalVarDec.current.subI[index]}</sub> = {Number.isInteger(FinalVarDec.current.val[index]) ? FinalVarDec.current.val[index] : delZero(FinalVarDec.current.val[index].toFixed(3))}</span>
                        )
                    })
                }
        </div>

        <button type='submit' className="btn_sig" onClick={reset}>Reiniciar</button>
    </div>
  )
}

export default TableList