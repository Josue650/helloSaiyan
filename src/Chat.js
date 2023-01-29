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
import EmojiPicker from 'emoji-picker-react';

function Chat({ messages, setMessages, setFoundMessage, newMsg, user }) {
  const [input, setInput] = useState("")
  const [showPicker, setShowPicker] = useState(false)

  const onEmojiClick = (emojiObj, e ) => {
    setInput(prevInput => prevInput + emojiObj.emoji);
    setShowPicker(false)

  }

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios.post("/server/path", formData)
        .then(response => console.log(response))
        .catch(error => console.log(error));
};

  const sendMsg = async (e) => {
    e.preventDefault();

     const response = await axios.post('/api/messages', {
      message: input,
      name: user.name,
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
            <AttachFile
            input type="file" onChange={handleFileInput}  />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className='chat__body'>
        {messages.map((message) => {
          const date = new Date(message.createdAt)
       return (
          <p className={`chat__message ${message.received && "chat__receiver"}`}>
          <span className='chat__name'>{message.name} </span>
              {message.message}
              <span className='chat__timestamp'>{date.toLocaleString()}</span>
              <br/><button onClick={() => deleteMessage(message._id)}>Delete Message</button>
            </p>
          )})}


          <p className='chat__message chat__receiver'>
        <span className='chat__name'></span>
            <span className='chat__timestamp'>

            </span>
          </p>
      </div>

      <div className='chat__footer'>
        <InsertEnojiIcon onClick={() => setShowPicker(!showPicker)}/>
        {showPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}

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
