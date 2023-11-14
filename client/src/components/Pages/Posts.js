import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import ReusableCard from "../UI/ReusableCard"

function Posts() {
    const navigate = useNavigate()
    const posts = useSelector((state) => state.posts.entities)
    // console.log(posts)
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