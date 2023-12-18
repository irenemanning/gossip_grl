import React from "react"
import { useNavigate } from "react-router-dom"
import ReusableForm from "../UI/ReusableForm"
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from "../../Redux/postsSlice"

function CreatePost() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const errors = useSelector((state) => state.posts.errors)

    const fields = [
        { label: 'Gossip', type: 'textarea', placeholder: 'Spill the tea', name: 'body'}
    ]
    const initialValues = {body: ''}

    const handleSubmitPost = async (data) => {
      try {
        const result = await dispatch(createPost(data))
        if (result.payload && result.payload.errors && result.payload.errors.length === 0) {
          navigate("/")
        } else {
          console.error("Error creating post:", result.payload ? result.payload.errors : "Payload is undefined")
        }
      } catch (error) {
        console.error('Error creating post:', error)
      }
    }

    return (
        <div>
            <h1>Create Post</h1>
            <ReusableForm fields={fields} initialValues={initialValues} onSubmit={handleSubmitPost} submitBtnText={"Post"} errors={errors} cancel={()=>navigate("/")} />
        </div>
    )
}

export default CreatePost