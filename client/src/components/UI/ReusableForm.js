import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap"

function ReusableForm({ fields, initialValues, onSubmit, submitBtnText, errors, btnVariant, cancel }) {
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
      <Form onSubmit={handleSubmit} className='reusable-form'>
        {fields.map((field) => (
          <Form.Group className='mb-3 row' key={field.label}>
            <Form.Label className='col-sm-2' >{field.label}</Form.Label>
            {field.type === 'textarea' ? (
              <Form.Control
                as="textarea"
                rows="2"
                placeholder={field.placeholder}
                name={field.name}
                value={formValues[field.name]}
                onChange={handleChange}
              />
            ) : (
              <Form.Control
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                value={formValues[field.name]}
                onChange={handleChange}
              />
            )}
          </Form.Group>
        ))}
        {errors.length > 0 && (
            <div style={{color: "red", listStylePosition: "inside"}}>
            {errors.map((error, index) => (
                <li key={index}>{error}</li>
            ))}
            </div>
        )}
        <Button variant={btnVariant ? btnVariant : "dark"} type="submit">
          {submitBtnText}
        </Button>
        {cancel && <Button variant='secondary' onClick={cancel}>Cancel</Button>}
      </Form>
    )
  }
  
  export default ReusableForm