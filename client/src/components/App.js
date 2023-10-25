import '../App.css'
import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../Redux/authSlice'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import CreatePost from './Pages/CreatePost'

function App() {
  const user = useSelector((state) => state.user.user)
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch()
  console.log(user)

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        <NavBar user={user} />
        <Routes> 
          
          {user? (
            <>
            <Route path="/" />
            <Route path="/profile" />
            <Route path='/gossips/:id' />
            <Route path='/gossip' element={<CreatePost/>} />
            </>
          ) : (
            <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
