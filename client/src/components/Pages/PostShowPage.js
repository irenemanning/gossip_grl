import React from "react"
import { Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { createComment, deleteComment } from "../../Redux/commentsSlice"
import ReusableCard from "../UI/ReusableCard"
import ReusableForm from "../UI/ReusableForm"
import ReusablePopover from "../UI/ReusablePopover"
import Posts from "./Posts"

function PostShowPage({ user }) {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts.entities) 
    const { id } = useParams()
    const post = posts.find((post) => post.id === parseInt(id))
    const comments = useSelector((state) => state.comments.entities)
    const postComments = comments.filter((c) => c.post_id === parseInt(id))
    const errors = useSelector((state) => state.comments.errors)

    const initialValues = { post_id: post?.id || 0, body: ''  }

    const fields = [
        { label: 'Leave a Comment', type: 'textarea', placeholder: 'Leave a comment', name: 'body'}
    ]
   
    function handleSubmitComment(data) {
        data = {post_id: post.id, user_id: user.id, body: data.body}
        dispatch(createComment(data))
    }
    function handleDeleteComment(data) {
        dispatch(deleteComment(data))
    }
    
    return (
        <div className="posts">
            {post && <Posts posts={[post]} />}
            <h2>Comments</h2>
            <ReusableForm initialValues={initialValues} fields={fields} onSubmit={handleSubmitComment} submitBtnText="Leave Comment" errors={errors} />
            <div className="comments-section">
                {postComments && postComments.map((c) => (
                <div className="comment-container" key={c.id}>
                    <ReusableCard  text={c.body} />
                    {user.id === c.user_id ? (
                        <div className="reusable-popover">
                            <ReusablePopover trigger="click" placement="right" 
                            content={(
                                <div className="popover-btns">
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDeleteComment(c.id)}
                                >
                                    Delete
                                </Button>
                                </div>
                            )} >
                            <Button variant="light" >...</Button>
                            </ReusablePopover>
                        </div>
                        
                    ) : (null)} 
                </div>
                ))}
            </div>
        </div>
    )
}

export default PostShowPage