import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Tooltip from "@material-ui/core/Tooltip";

//redux
import { connect } from "react-redux";
import { deletePost } from "../../redux/actions/dataActions";

const DeletePost = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePost = () => {
    props.deletePost(props.postId);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title="Delete post">
        <button className="icon-buttons" onClick={handleOpen}>
          <DeleteOutline color="action" />
        </button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Would you like to delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deletePost}>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(null, { deletePost })(DeletePost);
