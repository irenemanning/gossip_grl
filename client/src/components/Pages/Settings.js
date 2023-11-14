import React from "react"
import { Image } from "react-bootstrap"

function Settings({ user }) {
    return (
        <div>
            <h2>User Settings</h2>
            <div className="user-info">
                <h1>{user.username}</h1>
                {user.profile_image === null ? (
                <Image src="Profile-Placeholder.jpg" style={{height: "100px", width: "100px"}}  />
                ) : (
                <Image src={user.profile_image} />
                )}
            </div>
        </div>
    )
}

export default Settings