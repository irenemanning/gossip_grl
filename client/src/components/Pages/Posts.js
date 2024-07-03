import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { deletePost, setFilteredPosts } from "../../Redux/postsSlice"
import { Button, Image } from "react-bootstrap"
import ReusablePopover from "../UI/ReusablePopover"
import ReusableCard from "../UI/ReusableCard"

function Posts({ posts }) {
    const allPosts = useSelector((state) => state.posts.entities)
    const user = useSelector((state) => state.auth.user)
    const isLoadingPosts = useSelector((state) => state.posts.isLoadingPosts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
  
    if (isLoadingPosts) {
        return <div>Loading...</div>
    }
    function handleEdit(post) {
        navigate(`/edit/${post.id}`)
    }
    
    async function handleDelete(post) {
        await dispatch(deletePost(post.id))
        navigate('/')
    }

    function onHashtagClick(hashtag) {
        if (posts) {
            const filteredPosts = allPosts.filter(p => p.hashtags && p.hashtags.includes(hashtag.substr(1)))
            dispatch(setFilteredPosts(filteredPosts))
            navigate(`/hashtag/${hashtag.substr(1)}`)
        }
    }

    function renderPostBodyWithPinkHashtags(body) {
        return body.split(/(#[^\s]+)/).map((part, index) => (
            part.startsWith("#") ? (
                <span key={index} style={{ color: '#FF038D', cursor: 'pointer' }} onClick={() => onHashtagClick(part)} data-hashtag>
                    {part}
                </span>
            ) : (
                <span key={index}>{part}</span>
            )
        ))
    }
    return (
        <div className="posts">
            {posts.map((post) => (
                <div key={post.id} className="post-item" onClick={(e) => {
                    const isInsidePopover = e.target.closest('.reusable-popover')
                    if (!isInsidePopover && !e.target.closest('span[data-hashtag]')) {
                        navigate(`/gossip/${post.id}`)
                    }
                }}>
                    <small className="post-username">gossip from {post.user.username} </small>
                    <div className="post-profile-image">
                        {post.user.profile_image === null ? (
                        <Image src="/Profile-Placeholder.jpg" style={{height: "70px", width: "70px"}}  />
                        ) : (
                        <Image src={post.user.profile_image} style={{height: "70px", width: "70px"}} />
                        )}
                    </div>
                    
                    <ReusableCard  text={renderPostBodyWithPinkHashtags(post.body)} />
        
                    {location.pathname.includes('/gossip/') && post.user_id === user.id && (
                        <div className="reusable-popover">
                        <ReusablePopover trigger="click" placement="right" 
                        content={(
                            <div className="popover-btns">
                                <Button variant="outline-secondary" size="sm" onClick={() => handleEdit(post)} >
                                    Edit
                                </Button>
                                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(post)} >
                                    Delete
                                </Button>
                            </div>
                        )}
                        >
                            <Button variant="light">...</Button>
                        </ReusablePopover>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Posts