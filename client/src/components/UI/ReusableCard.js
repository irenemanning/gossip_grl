import React from "react"
import { Card } from 'react-bootstrap'

function ReusableCard({ text }) {

    return (
        <Card className="reusable-card" >
            <Card.Body>{text}
            </Card.Body>
        </Card>
    )
}

export default ReusableCard