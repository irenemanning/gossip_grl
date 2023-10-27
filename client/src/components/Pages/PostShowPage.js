import React from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { createComment } from "../../Redux/commentsSlice"
import ReusableCard from "../UI/ReusableCard"
import ReusableForm from "../UI/ReusableForm"

function PostShowPage() {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts.entities)
    const { id } = useParams()
    const post = posts.find((post) => post.id === parseInt(id))
    
    const initialValues = { post_id: post.id, body: ''  }

    const fields = [
        { label: 'Leave a Comment', type: 'textarea', placeholder: 'Leave a comment', name: 'body'}
    ]
   
    function handleSubmitComment(data) {
        dispatch(createComment(data))
    }

    return (
        <div className="post-show-page">
            {post && <ReusableCard text={post.body} />}
            <div className="comment-section">
                <h2>Comments</h2>
                <ReusableForm initialValues={initialValues} fields={fields} onSubmit={handleSubmitComment} />
                <div className="comments-container">
                    {post.comments.map((c)=> <ReusableCard key={c.id} text={c.body} />)}   
                </div>
                
            </div>   
        </div>
    )
}

export default PostShowPage