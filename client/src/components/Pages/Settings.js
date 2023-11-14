import React from "react"
import { useDispatch } from "react-redux"
import { Image, ListGroup, Form } from "react-bootstrap"
import { updateUser } from "../../Redux/authSlice"
import ReusableForm from "../UI/ReusableForm"
function Settings({ user }) {
    console.log(user)
    const dispatch = useDispatch()
    const initialValues = { username: user.username  }

    const fields = [
        { label: 'Change Username', type: 'text', placeholder: "Change Username", name: 'username'}
    ]

    function handleEditUsername(data) {
        data = {username: data.username, password: user.password, profile_image: user.profile_image}
        console.log('Change username Form submitted with data:', data)
        dispatch(updateUser(data))
        // navigate()
    }

    return (
        <div>
            <h2>User Settings</h2>
            <div className="user-info">
                <ListGroup>
                    <ListGroup.Item disabled>
                        {user.profile_image === null ? (
                        <Image src="Profile-Placeholder.jpg" style={{height: "100px", width: "100px"}}  />
                        ) : (
                        <Image src={user.profile_image} />
                        )}
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Change Profile Picture</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <ReusableForm initialValues={initialValues} fields={fields} onSubmit={handleEditUsername} />
                    </ListGroup.Item>
                    {/* <ListGroup.Item>Change Password</ListGroup.Item> */}
                    {/* <ListGroup.Item>Delete Accout</ListGroup.Item> */}
                </ListGroup>
            </div>
        </div>
    )
}

export default Settings