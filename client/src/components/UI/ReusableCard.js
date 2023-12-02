import React from "react"
import { Card } from 'react-bootstrap'
function ReusableCard({text}) {
    return (
        <Card className="reusable-card" >
            <Card.Body dangerouslySetInnerHTML={{ __html: text }} />
        </Card>
    )
}

export default ReusableCard