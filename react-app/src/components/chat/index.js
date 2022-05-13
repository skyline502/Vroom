import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import './Chat.css'
let socket;


const Chat = () => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const user = useSelector(state => state.session.user);
  const msgEnd = useRef(null);


  useEffect(() => {
    //open socket connection
    //create websocket
    socket = io();

    socket.on('chat', (chat) => {
      setMessages(messages => [...messages, chat]);
      //when component unmounts, and disconnects
      return (() => {
        socket.disconnect();
      })
    })
  }, []);

  useEffect(() => {
    msgEnd.current?.scrollIntoView();
  },[messages])

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = e => {
    e.preventDefault();
    if (chatInput) {
      socket.emit('chat', { user: user, msg: chatInput });
    }
    setChatInput('');
  }

  return (user && (
    <div>
      <div className="messages-box">
        {messages.map((message, ind) => (
          <div key={ind} className='chat-msg'>
            <div>{message.user.profile_url? <img className='chat-profile' src={message.user.profile_url} alt='profile'/>: message.user}</div>&nbsp;&nbsp;<p>{message.msg}</p>
          </div>
        ))}
        <div ref={msgEnd}></div>
      </div>
      <form onSubmit={sendChat} className='chat-form'>
        <input
          value={chatInput}
          onChange={updateChatInput}
        >
        </input>
        <button type="submit">Send</button>
      </form>
    </div>
  ))
};

export default Chat;
