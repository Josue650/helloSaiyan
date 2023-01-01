import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import "./Chat.css"
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import AttachFile from '@mui/icons-material/AttachFileOutlined';
import MoreVert from '@mui/icons-material/MoreVertOutlined';
import InsertEnojiIcon from '@mui/icons-material/InsertEmoticonOutlined';
import MicIcon from '@mui/icons-material/MicOutlined';

function chat() {
  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar />

        <div className='chat__headerInfo'>
          <h3>Room Name</h3>
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
        <p className='chat__message'>
        <span className='chat__name'>Josue</span>
            This is a message
            <span className='chat__timestamp'>
              {new Date().toLocaleString()}
            </span>
          </p>

          <p className='chat__message chat__receiver'>
        <span className='chat__name'>Josue</span>
            From me
            <span className='chat__timestamp'>
              {new Date().toLocaleString()}
            </span>
          </p>

          <p className='chat__message'>
        <span className='chat__name'>Josue</span>
            All the way to you
            <span className='chat__timestamp'>
              {new Date().toLocaleString()}
            </span>
          </p>
      </div>

      <div className='chat__footer'>
        <InsertEnojiIcon />
        <form>
          <input placeholder='Type a maessage'
           text="text"/>
          <button type='submit'>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default chat
