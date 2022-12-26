import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room: room,
                userName: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            setCurrentMessage('')
            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])


        }
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data])
        })
    }, [socket])
    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>{username}</p>
            </div>
            <div className='chat-body'>
                {messageList.map((messageContent) => {
                    return (
                        <div className='message' id={username===messageContent.userName?"you":"other"} key={messageContent.userName}>
                            <div>
                                <div className='message-content'>
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className='message-meta'>
                                    <p id='time'>{messageContent.time}</p>
                                    <p id='author'>{messageContent.userName}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='chat-footer'>
                <input type='text' placeholder='hai'
                    onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <button onClick={sendMessage} >&#9658;</button>
            </div>

        </div>
    )
}

export default Chat