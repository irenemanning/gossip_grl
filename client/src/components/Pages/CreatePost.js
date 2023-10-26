import React from "react"
import { useNavigate } from "react-router-dom"
import ReusableForm from "../UI/ReusableForm"
import { useDispatch } from 'react-redux'
import { createPost } from "../../Redux/postsSlice"

function CreatePost() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fields = [
        { label: 'Gossip', type: 'textarea', placeholder: 'Spill the tea', name: 'body'}
    ]
    const initialValues = {body: ''}

    function handleSubmit(data) {
        console.log('Form submitted with data:', data)
        dispatch(createPost(data))
        navigate("/")
    }

    return (
        <div>
            <h1>Create Post</h1>
            <ReusableForm fields={fields} initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
    )
}

export default CreatePost