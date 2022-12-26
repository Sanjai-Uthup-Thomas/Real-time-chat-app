import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './chat';
const socket = io.connect("http://localhost:3001")
function App() {
  const [userName, setUserName] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setshowChat] = useState(false)

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room)
      setshowChat(true)
    }
  }

  return (
    <div className="App">
      {
        !showChat ? (
          <div className="joinChatContainer">
            <h3>Join A Room</h3>
            <input type='text'
              placeholder='Sanjai'
              onChange={(e) => setUserName(e.target.value)} />
            <input type='text'
              placeholder='Room Id'
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinRoom}>Join The Room</button>
          </div>) :
          (<Chat socket={socket} username={userName} room={room} />)
      }
    </div>
  );
}

export default App;
