import React from "react"
import { useNavigate } from 'react-router-dom'
import { signupUser } from "../../Redux/authSlice"
import { useDispatch } from "react-redux"
import { Button } from "react-bootstrap"
import ReusableForm from "../UI/ReusableForm"

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const fields = [
        { label: 'Username', name: 'username', type: 'text', placeholder: 'Create Username'},
        { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter Password' },
        { label: 'Password Confirmation', name: 'password_confirmation', type: 'password', placeholder: 'Confirm Password' }
    ]
    const initialValues = {
        username: '',
        password: '',
        password_confirmation: ''
    }
    function handleSubmit(data) {
        dispatch(signupUser(data))
        navigate("/")
    }

    return (
        <div className="form-div">
            <h1>Sign Up</h1>
            <ReusableForm fields={fields} initialValues={initialValues} onSubmit={handleSubmit} />
            <p>
                Already have an account?  
                <Button variant="link" onClick={() => navigate('/login')} style={{color: "#800022"}} >Login</Button> 
            </p>
        </div>
    )

}

export default Signup