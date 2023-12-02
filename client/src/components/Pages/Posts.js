import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import ReusableCard from "../UI/ReusableCard"

function Posts() {
    const posts = useSelector((state) => state.posts.entities)
    const isLoadingPosts = useSelector((state) => state.posts.isLoadingPosts)
    // const dispatch = useDispatch()
    const navigate = useNavigate()
console.log(posts)
      if (isLoadingPosts) {
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