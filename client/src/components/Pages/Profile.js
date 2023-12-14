import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Image } from "react-bootstrap"
import Posts from "./Posts"

function Profile({user}) {
    const navigate = useNavigate()
    const posts = useSelector((state) => state.posts.entities)
    const userPosts = posts.filter((post) => post.user_id === user.id)

    return (
        <div>
            <h1>{user.username}</h1>
            {user.profile_image === null ? (
            <Image src="/Profile-Placeholder.jpg" style={{height: "100px", width: "100px"}}  />
            ) : (
            <Image src={user.profile_image} style={{height: "100px", width: "100px"}} />
            )}
            <h6 onClick={() => navigate('/profile/settings')}>Settings</h6>
            <Posts posts={userPosts} />
        </div>
    )
}

export default Profile