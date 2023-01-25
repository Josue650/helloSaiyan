import { useState, useEffect } from 'react';
import Sidebar from "./Sidebar"
import Chat from "./Chat.js"
import "./App.css"
import Pusher from "pusher-js"
import axios from 'axios';
import AuthPage from './pages/AuthPage/AuthPage';
import { getUser } from './utilities/users-service';

export default function App() {
  const [messages, setMessages] = useState([])
  const [user, setUser ] = useState(getUser())
  const [foundMessage, setFoundMessage] = useState(null)
  // const [toggle, setToggle] = useState(false)
  const [newMsg, setNewMsg] = useState({
    message: String,
    name: String,
    imestamp: String,
    received: Boolean
  })


    useEffect(() => {
      axios.get('/api/messages')
      .then(response => {
        setMessages(() => [...response.data])
      })
    }, [foundMessage])

    useEffect(() => {
      const pusher = new Pusher('42f2a5347709eede1b37', {
        cluster: 'us3'
      });

      const channel = pusher.subscribe('messages');

      channel.bind('inserted', function(newMessge) {
        setMessages((previousMessages)=> [...previousMessages, newMessge])
      });


      return () =>{
        channel.unbind_all();
        channel.unsubscribe()
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
            <Chat  messages={messages}
            setMessages={setMessages}
            setFoundMessage={setFoundMessage}
            setNewMsg={setNewMsg}
            user={user}/>
            </div>
            </>
            :
        <AuthPage setUser={setUser}/>
      }

        </main>


    )
}
