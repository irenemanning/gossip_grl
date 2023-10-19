import React from "react"
import ReusableForm from "../UI/ReusableForm"

function Login() {

    const fields = [
        { label: 'Username', type: 'text', placeholder: 'Enter Password'},
        { label: 'Password', type: 'password', placeholder: 'Enter Password' },
    ]
    const initialValues = {
        username: '',
        password: '',
    }

    function handleSubmit(data) {
        console.log('Form submitted with data:', data)
        // You can handle form submission logic here.
    }

    return (
        <div className="form-div">
            <h1>Sign Up</h1>
            <ReusableForm fields={fields} initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
    )
    
}

export default Login