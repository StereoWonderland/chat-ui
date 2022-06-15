import './App.css';
import Notification from './components/Notification'
import Login from './components/Login'
import Chat from './components/Chat'
import { useState } from 'react'

function App() {
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ user, setUser ] = useState(null)


  return (
    <div className="App">
      <Notification message={errorMessage} />
      {user === null
       ?
      <div>
        <h1>Welcome</h1>
        <div className="d-flex justify-content-center">
          <Login setErrorMessage={setErrorMessage} setUser={setUser}/>
        </div>
      </div>
       :
       <Chat user={user} setErrorMessage={setErrorMessage}/>
      }

    </div>
  );
}

export default App;
