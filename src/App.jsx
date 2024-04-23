import "./app.css"
import "./general.css"
import SimplexForm1 from "./components/SimplexForm1"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App () {

  return(
    <main>
      <h1>Simplex Method App</h1>
      <SimplexForm1/>
      <ToastContainer/>
    </main>
  )

}
export default App
