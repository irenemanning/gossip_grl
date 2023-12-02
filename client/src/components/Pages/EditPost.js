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
    const errors = useSelector((state) => state.posts.errors)

    // function handleEditPost(data) {
    //     data = {id: id, body: data.body}
    //     console.log('Form submitted with data:', data)
    //     dispatch(updatePost(data))
        // navigate(`/gossip/${data.id}`)
    // }
   
    const handleEditPost = async (data) => {
        console.log(data)
      try {
        const result = await dispatch(updatePost({ id: id, body: data.body }))
        if (result.payload && result.payload.errors && result.payload.errors.length === 0) {
          navigate(`/profile`)
        } else {
          console.error("Error editing post:", result.payload ? result.payload.errors : "Payload is undefined")
        }
      } catch (error) {
        console.error('Error editing post:', error)
      }
    }

    const initialValues = { body: postBeingEdited.body  }

    const fields = [
        { label: 'Edit Your gossip', type: 'textarea', placeholder: 'Edit Post', name: 'body'}
    ]

    return (
        <div>
            <ReusableForm initialValues={initialValues} fields={fields} onSubmit={handleEditPost} submitBtnText={"Post"} errors={errors} />
        </div>
    )
}

export default EditPost