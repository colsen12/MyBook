import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./PostDialog.css";

//components
import Comments from "./Comments";
import CommentForm from "./CommentForm";

// Material UI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";
import { makeStyles } from "@material-ui/core/styles";

// redux
import { connect } from "react-redux";
import { getPost, clearErrors } from "../../redux/actions/dataActions";

const PostDialog = (props) => {
  const [open, setOpen] = useState(false);

  const loadingStyles = () => {
    return {
      circularProgress: {
        color: "#2d767f",
        margin: "auto",
      },
    };
  };

  const classes = makeStyles(loadingStyles)();

  const { openDialog, getPost, postId } = props;
  const handleOpen = useCallback(() => {
    setOpen(true);
    getPost(postId);
  }, [getPost, postId]);

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, [handleOpen, openDialog]);

  const handleClose = () => {
    setOpen(false);
  };

  const {
    post: { body, createdAt, commentCount, userImage, userName, comments },
    UI: { loading },
  } = props;

  const dialogMarkup = loading ? (
    <CircularProgress className={classes.circularProgress} size={100} />
  ) : (
    <div className="PostDialog-container">
      <div className="poster-pic-container">
        <img src={userImage} alt="Profile" className="dialog-pic" />
      </div>
      <div className="commenter-info">
        <Link className="PostDialog-username" to={`/users/${userName}`}>
          {userName}
        </Link>
        <hr />
        <p>{body}</p>
        <hr />
        <button className="icon-buttons">
          <ChatIcon color="action" />
        </button>
        <span>
          {commentCount} {commentCount === 1 ? "comment" : "comments"}
        </span>
        <p className="original-post-time">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </p>
      </div>
      <CommentForm postId={postId} />
      <Comments comments={comments} />
    </div>
  );
  return (
    <React.Fragment>
      <button onClick={handleOpen} className="icon-buttons-comment">
        <span>View comments</span>
      </button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <div style={{ textAlign: "right" }}>
          <button className="icon-buttons" onClick={handleClose}>
            <CloseIcon color="action" />
          </button>
        </div>
        <DialogContent>{dialogMarkup}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

PostDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

const mapActionsToProps = {
  getPost,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(PostDialog);
