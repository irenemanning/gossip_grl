import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import ReusableCard from "../UI/ReusableCard"
import ReusableForm from "../UI/ReusableForm"

function PostShowPage() {
    const posts = useSelector((state) => state.posts.entities)
    const { id } = useParams()
    const post = posts.find((post) => post.id === parseInt(id))
    console.log(post)

    const initialValues = {body: ''}

    const fields = [
        { label: 'Leave a Comment', type: 'textarea', placeholder: 'Leave a comment', name: 'body'}
    ]

    return (
        <div className="post-show-page">
            {post && <ReusableCard text={post.body} />}
            <div className="comment-section">
                <h2>Comments</h2>
                <ReusableForm initialValues={initialValues} fields={fields} />
                {post.comments.map((c)=> <ReusableCard key={c.id} text={c.body} />)}
            </div>
            
        </div>
    )
}

export default PostShowPage