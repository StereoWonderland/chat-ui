import './App.css';
import Notification from './components/Notification'
import Login from './components/Login'
import Chat from './components/Chat'
import { useState, useEffect } from 'react'
import io from 'socket.io-client'

function App() {
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ user, setUser ] = useState(null)
  const [ socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io()
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])

  return (
    <div className="App">
      <Notification message={errorMessage} />
      {user === null
       ?
      <div>
        <h1>Welcome</h1>
        <div className="d-flex justify-content-center">
          <Login setErrorMessage={setErrorMessage} setUser={setUser} socket={socket}/>
        </div>
      </div>
       :
       <Chat user={user} setErrorMessage={setErrorMessage} socket={socket}/>
      }

    </div>
  );
}

export default App;
