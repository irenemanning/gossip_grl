import React from "react"
import ReusableForm from "../UI/ReusableForm"

function UpdatePost() {
    const fields = [
        { label: 'Gossip', type: 'textarea', placeholder: 'Spill the tea'} 
    ]
    const initialValues = {
        body: ''
    }

    function handleSubmit(data) {
        console.log('Form submitted with data:', data)
        // You can handle form submission logic here.
    }
    return (
        <div>
            <ReusableForm fields={fields} initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
    )
}

export default UpdatePost