import React from "react"
import ReusableCard from "../UI/ReusableCard"

function Profile({user}) {
    return (
        <div>
            <h1>{user.username}</h1>
            {user.posts.map((post)=> <ReusableCard key={post.id} text={post.body} /> )}
        </div>
    )
}

export default Profile