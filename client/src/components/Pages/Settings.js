import React from "react"
import { Image, ListGroup, Form } from "react-bootstrap"
import ReusableForm from "../UI/ReusableForm"
function Settings({ user }) {

    const initialValues = { username: user.username  }

    const fields = [
        { label: 'Change Username', type: 'text', placeholder: "Change Username", name: 'username'}
    ]

    function handleEditUsername(data) {
        console.log("data")
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
                </ListGroup>
            </div>
        </div>
    )
}

export default Settings