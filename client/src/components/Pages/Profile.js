import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button, Image } from "react-bootstrap"
import ReusablePopover from "../UI/ReusablePopover"
import ReusableCard from "../UI/ReusableCard"
import { deletePost } from "../../Redux/postsSlice"

function Profile({user}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts.entities)
    const userPosts = posts.filter((post) => post.user_id === user.id)

    function handleDelete(post) {
        dispatch(deletePost(post.id))
    }

    return (
        <div className="profile">
            <div className="user-info">
                <h1>{user.username}</h1>
                {user.profile_image === null ? (
                <Image src="Profile-Placeholder.jpg" style={{height: "100px", width: "100px"}}  />
                ) : (
                <Image src={user.profile_image} />
                )}
                <h6 onClick={() => navigate('/profile/settings')}>Settings</h6>
            </div>
            
            {userPosts.map((post)=> (
                <div key={post.id} className="user-post">
                    <ReusableCard  text={post.body} />
                    <ReusablePopover trigger="click" placement="right" 
                    content={(
                        <div className="popover-btns">
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => navigate(`/edit/${post.id}`)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(post)}
                        >
                            Delete
                        </Button>
                        </div>
                    )} >
                        <Button variant="light" >...</Button>
                    </ReusablePopover>
                </div>
            ))}
        </div>
    )
}

export default Profile