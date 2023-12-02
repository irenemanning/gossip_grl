import React from "react"
import { useNavigate } from 'react-router-dom'
import { signupUser } from "../../Redux/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "react-bootstrap"
import ReusableForm from "../UI/ReusableForm"

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const errors = useSelector((state) => state.auth.errors)
    
    const fields = [
        { label: 'Username', name: 'username', type: 'text', placeholder: 'Create Username'},
        { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter Password' },
        { label: '', name: 'password_confirmation', type: 'password', placeholder: 'Confirm Password' }
    ]
    const initialValues = {
        username: '',
        password: '',
        password_confirmation: ''
    }

    async function handleSignUp(data) {
        try {
            dispatch(signupUser(data))
        } catch (error) {
          console.error('Signup failed:', error)
        }
    }

    return (
        <div className="form-div">
            <h1>Sign Up</h1>
            <ReusableForm fields={fields} initialValues={initialValues} onSubmit={handleSignUp} submitBtnText={"Sign Up"} errors={errors} />
            <p>
                Already have an account?  
                <Button variant="link" onClick={() => navigate('/login')} style={{color: "#FF038D"}} >Login</Button> 
            </p>
        </div>
    )

}

export default Signup