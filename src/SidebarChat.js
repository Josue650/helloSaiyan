import { Avatar } from '@mui/material'
import React from 'react'
import "./SidebarChat.css"

function SidebarChat() {
  return (
    <div className='sidebarChat'>
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgJ4liRLDl6CMCyT2BxL3rP7LvwR5sPfWhOQ&usqp=CAU"/>
        <div className='sidebarChat__info'>
            <h2>Saiyan Room</h2>
            <p>This is the last message</p>
        </div>
    </div>



  )
}

export default SidebarChat
