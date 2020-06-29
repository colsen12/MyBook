import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
//css styling in postdialog.css

const Comments = (props) => {
  const { comments } = props;
  return (
    <div>
      {comments.map((comment, index) => {
        const { body, createdAt, userImage, userName } = comment;
        return (
          <React.Fragment key={createdAt}>
            <div className="comment-container">
              <div className="commenter-pic-container">
                <Link className="PostDialog-username" to={`/users/${userName}`}>
                  {userName}
                </Link>
                <img
                  className="commenter-image"
                  src={userImage}
                  alt="comment"
                />
              </div>
              <div className="commenter-info">
                <hr />
                <p className="comment-body">{body}</p>
                <p className="post-time">
                  {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                </p>
              </div>
            </div>
            {index !== comments.length - 1 && <hr className="last-hr" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};

export default Comments;
