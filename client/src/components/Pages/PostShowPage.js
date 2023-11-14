import React, {useEffect} from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { createComment, deleteComment } from "../../Redux/commentsSlice"
import { fetchComments } from "../../Redux/commentsSlice"
import ReusableCard from "../UI/ReusableCard"
import ReusableForm from "../UI/ReusableForm"
import ReusablePopover from "../UI/ReusablePopover"
import { Button } from "react-bootstrap"

function PostShowPage({ user }) {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts.entities)
    const { id } = useParams()
    const post = posts.find((post) => post.id === parseInt(id))
    const comments = useSelector((state) => state.comments.entities).filter(c => c.post_id == post.id)
    // console.log(post)
    // console.log(comments)

    useEffect(() => {
        dispatch(fetchComments())
    }, [dispatch])

    const initialValues = { post_id: post.id, body: ''  }

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
        <div className="post-show-page">
            {post && <ReusableCard text={post.body} />}
            <div className="comment-section">
                <h2>Comments</h2>
                <ReusableForm initialValues={initialValues} fields={fields} onSubmit={handleSubmitComment} />
                <div className="comments-container">
                    {/*  post && post.comments && post.comments.map((c)  */}
                    {post && comments.map((c) => (
                        <div className="user-post" key={c.id}>
                           <ReusableCard  text={c.body} />
                           {user.id == c.user_id ? (
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