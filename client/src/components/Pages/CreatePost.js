import React from "react"
import ReusableForm from "../UI/ReusableForm"

function CreatePost() {
    
    const fields = [
        { label: 'Gossip', type: 'textarea', placeholder: 'Spill the tea'},
        { label: 'Hashtags', type: 'text', placeholder: 'Add your hashtags here' }, 
    ]
    const initialValues = {
        body: '',
        post_hashtags: '',
    }

    function handleSubmit(data) {
        console.log('Form submitted with data:', data)
        // You can handle form submission logic here.
    }

    return (
        <div>
            <h1>Create Post</h1>
            <ReusableForm fields={fields} initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
    )
}

export default CreatePost