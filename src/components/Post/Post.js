import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import PostDialog from "./PostDialog.js";
import Like from "./Like.js";
import DeletePost from "./DeletePost.js";
import "./Post.css";

//Material UI
import ChatIcon from "@material-ui/icons/Chat";

//redux
import { connect } from "react-redux";

const Post = (props) => {
  dayjs.extend(relativeTime);
  const {
    post: {
      body,
      createdAt,
      userImage,
      userName,
      postId,
      likeCount,
      commentCount,
    },
    user: {
      authenticated,
      credentials: { handle },
    },
  } = props;

  const deleteButton =
    authenticated && userName === handle ? (
      <DeletePost postId={postId} />
    ) : null;
  return (
    <div className="post-container">
      <div className="user-image">
        <img src={userImage} alt="User" />
      </div>
      <div className="post">
        <div className="username-delete-button">
          <li className="user-link">
            <Link className="userName" to={`/users/${userName}`}>
              {userName}
            </Link>
          </li>
          {deleteButton}
        </div>
        <p className="post-body">{body}</p>
        <Like postId={postId} />
        <span className="post-like-count">{likeCount}</span>
        <ChatIcon color="action" />
        {commentCount}
        <div className="createdAt-comment-span">
          <div className="post-createdAt">
            <p>{dayjs(createdAt).fromNow()}</p>
          </div>
          <div>
            <PostDialog
              postId={postId}
              userName={userName}
              openDialog={props.openDialog}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Post);
