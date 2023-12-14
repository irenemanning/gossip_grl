import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Posts from "./Posts"

function HashtagSearch() {
    const filteredPosts = useSelector(state => state.posts.filteredPosts)
    const { hashtag } = useParams()
    
    return (
        <div>
            <h1>#{hashtag}</h1>
            <Posts posts={filteredPosts} />
        </div>
    )
}

export default HashtagSearch