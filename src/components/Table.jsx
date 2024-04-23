function Table({principalInfo, valTabla, varBasics}) {

    function delZero(num){
        let newNum=num.toString()

        while(newNum[-1]=="0"){
            newNum = newNum.slice(0,-1)
        }

        return Number.parseFloat(newNum) 
    }

  return (
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
                            valTabla.funcObj.map((val, i)=>{
                                
                                return <td key={i} className={valTabla.indexPivCol==i ? "pivote" : ""}>{Number.isInteger(val) ? val : delZero(val.toFixed(3))}</td>
                            })
                        }
                    </tr>
                    
                    {
                        Array.from({ length: principalInfo.rest }, (_, i) => i + 1).map((variable, index)=>{
                            return(
                                <tr key={index} className={valTabla.indexPivRow==index ? "pivote" : ""}>
                                    <th>{varBasics.var[index]}<sub>{varBasics.subI[index]}</sub></th>
                                    <td>0</td>
                                    {
                                        valTabla["rest" + index].map((val, i)=>{
                                            return <td key={i} className={valTabla.indexPivCol==i && valTabla.indexPivRow==index ? "el_pivote" : valTabla.indexPivCol==i ? "pivote" : ""}>{Number.isInteger(val) ? val : delZero(val.toFixed(3))}</td>
                                        })
                                    }
                                </tr>

                                    ) 
                                })
                    }
                    
                </tbody>
            </table>
  )
}

export default Table