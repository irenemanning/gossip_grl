import React from "react"
import { useNavigate } from 'react-router-dom'
import { loginUser } from "../../Redux/authSlice"
import { useDispatch } from "react-redux"
import { Button } from "react-bootstrap"
import ReusableForm from "../UI/ReusableForm"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const initialValues = {username: '', password: ''}

    const fields = [
        { label: 'Username', type: 'text', placeholder: 'Enter Password', name: 'username'},
        { label: 'Password', type: 'password', placeholder: 'Enter Password', name: 'password' },
    ]
    
    function handleSubmit(data) {
        dispatch(loginUser(data))
        navigate("/")
    }

    return (
        <div className="form-div">
            <h1>Login</h1>
            <ReusableForm fields={fields} initialValues={initialValues} onSubmit={handleSubmit} />
            <p>
                Don't have an account?  
                <Button variant="link" onClick={() => navigate('/signup')} style={{color: "#800022"}} >Sign up</Button> 
            </p>
        </div>
    )
    
}

export default Login