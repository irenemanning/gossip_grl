
import '../App.css'
import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import CreatePost from './Pages/CreatePost'

function App() {
  // const [user, setUser] = useState(null)
  const [user, setUser] = useState(true)
  // const [posts, setPosts] = useState([])
  const [showSignin, setShowSignin] = useState(true)


  return (
    <div className="App">
      <Router>
        <NavBar user={user} setUser={setUser} setShowSignin={setShowSignin} />
        <Routes> 
          <Route path="/" />
          {user? (
            <>
            <Route path="/profile" />
            <Route path='/gossips' />
            <Route path='/gossips/:id' />
            <Route path='/gossip' element={<CreatePost/>} />
            </>
          ) : (
            <>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
