import React from "react"
import { setFilteredPosts } from "../../Redux/postsSlice"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { deletePost } from "../../Redux/postsSlice"
import { Button } from "react-bootstrap"
import ReusablePopover from "../UI/ReusablePopover"
import ReusableCard from "../UI/ReusableCard"

function Posts({ posts }) {
    const allPosts = useSelector((state) => state.posts.entities)
    const user = useSelector((state) => state.auth.user)
    const isLoadingPosts = useSelector((state) => state.posts.isLoadingPosts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    if (isLoadingPosts) {
        return <div>Loading...</div>
    }
    function handleDelete(post) {
        dispatch(deletePost(post.id))
    }

    function onHashtagClick(hashtag) {
        const filteredPosts = allPosts.filter(p => p.hashtags.includes(hashtag.substr(1)))
        dispatch(setFilteredPosts(filteredPosts))
        navigate(`/hashtag/${hashtag.substr(1)}`)
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
                    if (!e.target.closest('span[data-hashtag]')) {
                        navigate(`/gossip/${post.id}`)
                    }
                }}>
                    <ReusableCard  text={renderPostBodyWithPinkHashtags(post.body)} />
                    {post.user_id === user.id && (
                        <div className="reusable-popover">
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