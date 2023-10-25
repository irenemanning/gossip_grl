import React from "react"
import { Card } from 'react-bootstrap'
function ReusableCard({text}) {
    return (
        <div>
            <Card>
                <Card.Body>{text}</Card.Body>
            </Card>
        </div>
    )
}

export default ReusableCard