import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updatePost } from "../../Redux/postsSlice"
import ReusableForm from "../UI/ReusableForm"

function EditPost() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const posts = useSelector((state) => state.posts.entities)
    const postBeingEdited = posts.find((post) => post.id === parseInt(id))

    function handleEditPost(data) {
        data = {id: id, body: data.body}
        console.log('Form submitted with data:', data)
        dispatch(updatePost(data))
        navigate(`/gossip/${data.id}`)
    }

    const initialValues = { body: postBeingEdited.body  }

    const fields = [
        { label: 'Edit Your gossip', type: 'textarea', placeholder: 'Edit Post', name: 'body'}
    ]

    return (
        <div>
            <ReusableForm initialValues={initialValues} fields={fields} onSubmit={handleEditPost} />
        </div>
    )
}

export default EditPost