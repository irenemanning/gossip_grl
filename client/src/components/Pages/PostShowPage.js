import React from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { createComment, deleteComment } from "../../Redux/commentsSlice"
import ReusableCard from "../UI/ReusableCard"
import ReusableForm from "../UI/ReusableForm"
import ReusablePopover from "../UI/ReusablePopover"
import { Button } from "react-bootstrap"

function PostShowPage({ user }) {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts.entities) 
    const { id } = useParams()
    const post = posts.find((post) => post.id === parseInt(id))
    const comments = useSelector((state) => state.comments.entities)
    const postComments = comments.filter((c) => c.post_id === parseInt(id))
    const errors = useSelector((state) => state.comments.errors)

    // const initialValues = { post_id: post.id, body: ''  }
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

    function renderPostBodyWithBlueHashtags (body) {
        return body.replace(/#\w+/g, '<span style="color: #FF038D">$&</span>')
    }
console.log(postComments)
    return (
        <div className="post-show-page">
            {post && <ReusableCard text={renderPostBodyWithBlueHashtags(post.body)} />}
            <div className="comment-section">
                <h2>Comments</h2>
                <ReusableForm initialValues={initialValues} fields={fields} onSubmit={handleSubmitComment} submitBtnText="Leave Comment" errors={errors} />
                <div className="comments-container">
                    {/*  post && post.comments && post.comments.map((c)  */}
                    {postComments && postComments.map((c) => (
                        <div className="user-post" key={c.id}>
                           <ReusableCard  text={c.body} />
                           {user.id === c.user_id ? (
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
                           ) 
                           : (null)} 
                        </div>
                        )
                    )}
                </div>
            </div>   
        </div>
    )
}

export default PostShowPage