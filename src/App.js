import { useState, useEffect } from 'react';
import Sidebar from "./Sidebar"
import Chat from "./Chat.js"
import "./App.css"
import Pusher from "pusher-js"
import axios from 'axios';
import AuthPage from './pages/AuthPage/AuthPage';

export default function App() {
  const [messages, setMessages] = useState([])
  const [user, setUser ] = useState(null)
  const [newMsg, setNewMsg] = useState({
    message: String,
    name: String,
    imestamp: String,
    received: Boolean
  })

    useEffect(() => {
      axios.get('/api/messages')
      .then(response => {
        setMessages(response.data)
      })
    }, [])

    useEffect(() => {
      const pusher = new Pusher('42f2a5347709eede1b37', {
        cluster: 'us3'
      });

    const channel = pusher.subscribe('messages');
      channel.bind('inserted', function(newMessge) {
        alert(JSON.stringify(data))
        setMessages([...messages, newMessge])
      });

    return () => {
        channel.unbind_all();
        channel.unsubscribe();
      }
    }, [messages])

    console.log(messages)

    return(
        <main className='app'>
          {
            user ?
            <>
            <div className='app_body'>
            <Sidebar />
            <Chat  messages={messages}/>
            </div>
            </>
            :
        <AuthPage setUser={setUser}/>
      }

        </main>


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
 // const [receivedMsg, setReceivedMsg ] = useState([])
    // const [newMsg, setNewMsg] = useState({
    //   message: '',
    //   name: '',
    //   timestamp: '',
    //   received: false
    // })

    // const createMsg = async () => {
    //   const body = {...newMsg}
    //     try {
    //         const response = await fetch(`/api/messages`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(body)
    //         })
    //         const createdMsg = await response.json()
    //         const msgCopy = [createdMsg]
    //         setNewMsg(msgCopy)
    //         set({
    //           message: '',
    //           name: '',
    //           timestamp: '',
    //           received: false
    //         })
    //     } catch (error) {
    //       console.error(error)
    //     }
    //   }
