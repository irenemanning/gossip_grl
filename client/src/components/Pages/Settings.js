import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Image, ListGroup, Form, Button } from "react-bootstrap"
import { updateUser, updateProfileImage, deleteUser } from "../../Redux/authSlice"
import ReusableForm from "../UI/ReusableForm"
import ReusableModal from "../UI/ReusableModal"
import { useNavigate } from "react-router-dom"
function Settings({ user }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const dispatch = useDispatch()
    const [profileImage, setProfileImage] = useState(user.profile_image)
    const profileImageErrors = useSelector((state) => state.auth.profileImageErrors)
    const usernameErrors = useSelector((state) => state.auth.usernameErrors)
    const passwordErrors = useSelector((state) => state.auth.passwordErrors)
    const navigate = useNavigate()

    function handleFileChange(event) {
        setProfileImage(event.target.files[0])
    }
    function handleEditProfileImage(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('user[profile_image]', profileImage)
        dispatch(updateProfileImage(formData))
    }
    function handleEditUsername(data) {
        dispatch(updateUser({ user: { username: data.username } }))
    }
    function handleEditPassword(data) {
        dispatch(updateUser({ user: { password: data.password, password_confirmation: data.password_confirmation } }))
    }
    function handleDeleteUser(data) {
        dispatch(deleteUser(data))
        setShowDeleteModal(false)
        navigate('/login')
    }

    return (
        <div className="user-info">
            <ListGroup>
            <ListGroup.Item>
                <h1>User Settings</h1>
            </ListGroup.Item>
                <ListGroup.Item>
                    {user.profile_image === null ? (
                    <Image src="/Profile-Placeholder.jpg" style={{height: "100px", width: "100px"}}  />
                    ) : (
                    <Image src={user.profile_image} style={{height: "100px", width: "100px"}} />
                    )}
                    <Form onSubmit={handleEditProfileImage} encType="multipart/form-data" >
                        <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Change Profile Picture</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                        {profileImageErrors.length > 0 && (
                            <div style={{color: "red", listStylePosition: "inside"}}>
                            {profileImageErrors.map((error) => (<li key={error}>{error}</li>))}
                            </div>
                        )}
                        <Button variant="dark" type="submit">Upload</Button>
                    </Form>
                </ListGroup.Item>
                <ListGroup.Item>
                    <ReusableForm 
                    initialValues={{ username: user.username}} 
                    fields={[
                        { label: 'Change Username', type: 'text', placeholder: "Change Username", name: 'username'}
                    ]} 
                    onSubmit={handleEditUsername} 
                    submitBtnText={"Change Username"}
                    errors={usernameErrors}
                    />
                </ListGroup.Item>
                <ListGroup.Item>
                    <ReusableForm 
                    initialValues={{password: '', password_confirmation: ''}} 
                    fields={[
                        { label: 'Change Password', type: 'password', placeholder: "Change Password", name: 'password'},
                        { label: '', type: 'password', placeholder: "Re-type New Password", name: 'password_confirmation'}
                    ]} 
                    onSubmit={handleEditPassword} 
                    submitBtnText={"Change Password"}
                    errors={passwordErrors}
                    />
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button onClick={() => setShowDeleteModal(true)} variant="dark" type="submit">Delete Account</Button>
                    <ReusableModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Account">
                        <ReusableForm 
                        initialValues={{password: ''}} 
                        fields={[{ label: 'Verify Your Password To Continue Account Deletion', type: 'password', placeholder: "Enter Password", name: 'password'}]} 
                        onSubmit={handleDeleteUser} 
                        submitBtnText={"Delete Account"}
                        btnVariant="danger"
                        errors={passwordErrors}
                        />
                    </ReusableModal>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default Settings