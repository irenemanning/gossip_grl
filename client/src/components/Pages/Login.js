import React from "react"
import { useNavigate } from 'react-router-dom'
import { loginUser } from "../../Redux/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "react-bootstrap"
import ReusableForm from "../UI/ReusableForm"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const errors = useSelector((state) => state.auth.errors)

    const initialValues = {username: 'demo', password: 'demo'}
    const fields = [
        { label: 'Username', type: 'text', placeholder: 'Enter Username', name: 'username'},
        { label: 'Password', type: 'password', placeholder: 'Enter Password', name: 'password' },
    ]

    async function handleLogin(data) {
        try {
            await dispatch(loginUser(data));
       
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    return (
        <div className="form-div">
            <h1>Login</h1>
            <ReusableForm fields={fields} initialValues={initialValues} onSubmit={handleLogin} submitBtnText={"Login"} errors={errors} />
            <p>
                Don't have an account?  
                <Button variant="link" onClick={() => navigate('/signup')} style={{color: "#FF038D"}} >Sign up</Button> 
            </p>
        </div>
    )

}

export default Login