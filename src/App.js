import { useState, useEffect } from 'react';
import Sidebar from "./Sidebar"
import Chat from "./Chat.js"
import "./App.css"
import { Routes, Route} from 'react-router-dom'


function App() {
    const [state, setState] = useState(null)
    const [user, setUser ] = useState(null)

    const fetchState = async () => {
        try {
          const response = await fetch('/api/messages')
          const data = await response.json()
          setState(data)
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(() => {
        fetchState()
      }, [])

    return(
        <div className='app'>
            <div className='app_body'>
            <Sidebar />
            <Chat />
            </div>
        </div>


    )
}
//   const [state, setState] = useState(null)
//   const fetchState = async () => {
//     try {
//       const response = await fetch('/api/test')
//       const data = await response.json()
//       setState(data)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   useEffect(() => {
//     fetchState()
//   }, [])

//   return (
//     <div className="App">
//       { state && state.eureka ? <>{state.eureka}</> : <>You are still looking don't give up.</> }
//     </div>
//   );
// }

export default App;
