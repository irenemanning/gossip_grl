import React from "react"
import { Button, Image } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import { deleteComment } from "../../Redux/commentsSlice"
import ReusableCard from "../UI/ReusableCard"
import ReusablePopover from "../UI/ReusablePopover"

function Comments({ c, user }) {
    const dispatch = useDispatch()
  
    function handleDeleteComment(data) {
      dispatch(deleteComment(data))
    }
  
    return (
      <div className="comments-section">
        <div className="comment-container">
        <small className="post-username">Comment By: {c.user.username} </small>
          <div className="post-profile-image">
            {c.user.profile_image === null ? (
              <Image src="/Profile-Placeholder.jpg" style={{ height: "70px", width: "70px" }} />
            ) : (
              <Image src={c.user.profile_image} style={{ height: "70px", width: "70px" }} />
            )}
          </div>
  
            <ReusableCard text={c.body} />
  
            {user.id === c.user_id ? (
              <div className="reusable-popover">
                <ReusablePopover trigger="click" placement="right"
                  content={(
                    <div className="popover-btns">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteComment(c.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}>
                  <Button variant="light">...</Button>
                </ReusablePopover>
              </div>
            ) : (null)}
    
        </div>
      </div>
    )
  }

export default Comments