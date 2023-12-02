import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import ReusableCard from "../UI/ReusableCard"

function Posts() {
    const posts = useSelector((state) => state.posts.entities)
    const isLoadingPosts = useSelector((state) => state.posts.isLoadingPosts)

    const navigate = useNavigate()

    if (isLoadingPosts) {
        return <div>Loading...</div>
    }

    function renderPostBodyWithBlueHashtags (body) {
        return body.replace(/#\w+/g, '<span style="color: #FF038D">$&</span>')
    }
  
    return (
        <div className="posts-page">
            {posts.map((post) => (
                <div key={post.id} onClick={()=>{navigate(`/gossip/${post.id}`)}}>
                    <ReusableCard  text={renderPostBodyWithBlueHashtags(post.body)} />
                </div>
            ))}
        </div>
    )
}

export default Posts