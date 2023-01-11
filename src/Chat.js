import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import "./Chat.css"
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import AttachFile from '@mui/icons-material/AttachFileOutlined';
import MoreVert from '@mui/icons-material/MoreVertOutlined';
import InsertEnojiIcon from '@mui/icons-material/InsertEmoticonOutlined';
import MicIcon from '@mui/icons-material/MicOutlined';
import axios from './axios';
import { useState, useEffect } from 'react';


function Chat({ messages, setMessages, setFoundMessage, newMsg }) {
  const [input, setInput] = useState("")


  const sendMsg = async (e) => {
    e.preventDefault();

     const response = await axios.post('/api/messages', {
      message: input,
      name: "Sway",
      timestamp: "1/11/2023",
      received: false,

    })
    setMessages([...messages, response.data])
    setInput("")
  };

  const deleteMessage = async (id) => {
    try {
        const response = await fetch(`/api/messages/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        setFoundMessage(data)
    } catch (error) {
        console.error(error)
    }
}

const getMsgs = async () => {
  try{
      const response = await fetch('/api/messeges')
      const foundMessage = await response.json()
      setFoundMessage(foundMessage.reverse())
  } catch(error) {
      console.error(error)
  }
}
useEffect(() => {
  getMsgs()
}, [])

  return (
    <div className='chat'>
      <div className='chat__header'>
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgJ4liRLDl6CMCyT2BxL3rP7LvwR5sPfWhOQ&usqp=CAU"/>

        <div className='chat__headerInfo'>
          <h3>Saiyan Room</h3>
          <p>Last seen at...</p>
        </div>

        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined/>
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className='chat__body'>
        {messages.map((message) => (
          <p className={`chat__message ${message.received && "chat__receiver"}`}>
          <span className='chat__name'>{message.name} </span>
              {message.message}
              <span className='chat__timestamp'>{message.timestamp}</span>
              <br/><button onClick={() => deleteMessage(message._id)}>Delete Message</button>
            </p>
          ))}


          <p className='chat__message chat__receiver'>
        <span className='chat__name'>King Kai</span>
            Welcome Saiyan
            <span className='chat__timestamp'>
              {new Date().toLocaleString()}
            </span>
          </p>
      </div>

      <div className='chat__footer'>
        <InsertEnojiIcon />
        <form>
          <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type a message'
          text="text"
          />
          <button onClick={sendMsg} type='submit'>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
