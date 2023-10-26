import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

function ReusablePopover({ trigger, placement, content }) {
  const popover = (
    <Popover id="popover-basic">
      {content}
    </Popover>
  );

  return (
    <OverlayTrigger trigger={trigger} placement={placement} overlay={popover}>
      {props.children}
    </OverlayTrigger>
  );
}

export default ReusablePopover;