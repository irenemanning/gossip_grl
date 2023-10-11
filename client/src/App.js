
import './App.css';
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
function App() {
  const [user, setUser] = useState(null);
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
            <Route path='/+gossip'  />
            </>
          ) : (
            <>
            <Route path="/signin" />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
