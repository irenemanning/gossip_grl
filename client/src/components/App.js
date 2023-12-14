import '../App.css'
import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../Redux/authSlice'
import { fetchPosts } from '../Redux/postsSlice'
import { fetchComments } from '../Redux/commentsSlice'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import NavBar from './NavBar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import Settings from './Pages/Settings'
import Posts from './Pages/Posts'
import HashtagSearch from './Pages/HashtagSearch'
import PostShowPage from './Pages/PostShowPage'
import CreatePost from './Pages/CreatePost'
import EditPost from './Pages/EditPost'

function App() {
  const user = useSelector((state) => state.auth.user)
  const posts = useSelector((state) => state.posts.entities)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const isLoading = useSelector((state) => state.auth.isLoading)
  const isLoadingComments = useSelector((state) => state.comments.isLoadingComments)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUser())
      await dispatch(fetchPosts())
      dispatch(fetchComments())
    }
    fetchData()
  }, [dispatch, isAuthenticated])

  if (isLoading || isLoadingComments) {
    return <div>Loading...</div>
  }
 
  return (
    <div className="App">
      <Router>
        <NavBar user={user} />
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Posts posts={posts} />} />
              <Route path="/hashtag/:hashtag" element={<HashtagSearch />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/gossip/:id" element={<PostShowPage user={user} />} />
              <Route path="/gossip" element={<CreatePost />} />
              <Route path="/profile/settings" element={<Settings user={user} />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
    </div>
  )
}

export default App
