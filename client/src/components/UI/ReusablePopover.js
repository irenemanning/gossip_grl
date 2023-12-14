import React from "react"
import { OverlayTrigger, Popover } from "react-bootstrap"

function ReusablePopover({ trigger, placement, children, content }) {
  const popover = (
    <Popover id="popover-basic" >
      {content}
    </Popover>
  )

  return (
    <OverlayTrigger trigger={trigger} placement={placement} overlay={popover}>
      {children}
    </OverlayTrigger>
  )
}

export default ReusablePopover