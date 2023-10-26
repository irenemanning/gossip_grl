import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from "../../Redux/postsSlice"
import ReusableCard from "../UI/ReusableCard"

function Posts() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const posts = useSelector((state) => state.posts.entities)
    const isLoading = useSelector((state) => state.posts.isLoading)

    useEffect(() => {
        dispatch(fetchPosts())
      }, [dispatch])
    
      if (isLoading) {
        return <div>Loading...</div>
      }
    
    return (
        <div className="posts-page">
            {posts.map((post) => (
                <div key={post.id} onClick={()=>{navigate(`/gossip/${post.id}`)}}>
                    <ReusableCard  text={post.body} />
                </div>
            ))}
        </div>
    )
}

export default Posts