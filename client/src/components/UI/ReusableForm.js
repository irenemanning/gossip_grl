import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap"

function ReusableForm({ fields, initialValues, onSubmit }) {
    const [formValues, setFormValues] = useState(initialValues)
  
    const handleChange = (e) => {
      const { name, value } = e.target
      setFormValues({ ...formValues, [name]: value })
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(formValues)
    }
  
    return (
      <Form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <Form.Group key={field.label}>
            <Form.Label>{field.label}</Form.Label>
            {field.type === 'textarea' ? (
              <Form.Control
                as="textarea"
                rows="4" // You can adjust the number of rows
                placeholder={field.placeholder}
                value={formValues[field.name]}
                onChange={handleChange}
              />
            ) : (
              <Form.Control
                type={field.type}
                placeholder={field.placeholder}
                value={formValues[field.name]}
                onChange={handleChange}
              />
            )}
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
  
  export default ReusableForm