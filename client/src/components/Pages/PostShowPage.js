import React from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { createComment, deleteComment } from "../../Redux/commentsSlice"
import ReusableForm from "../UI/ReusableForm"
import Posts from "./Posts"
import Comments from "./Comments"

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

    return (
        <div>
            {post && <Posts posts={[post]} />}
            <h2>Comments</h2>
            <ReusableForm initialValues={initialValues} fields={fields} onSubmit={handleSubmitComment} submitBtnText="Leave Comment" errors={errors} />
            <div>
                {postComments && postComments.map((c) => (
                <div key={c.id}>
                    <Comments c={c} user={user} />
                </div>
                ))}
            </div>
        </div>
    )
}

export default PostShowPage