import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI Stuff
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

// Redux stuff
import { connect } from "react-redux";
import { newPost, clearErrors } from "../../redux/actions/dataActions";

const NewPost = (props) => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");

  const loadingStyles = () => {
    return {
      circularProgress: {
        color: "white",
      },
    };
  };

  const classes = makeStyles(loadingStyles)();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.clearErrors();
    setOpen(false);
  };

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.newPost({ body: body });
    setBody("");
    setOpen(false);
  };

  const {
    UI: { loading },
  } = props;

  return (
    <React.Fragment>
      <li onClick={handleOpen}>New Post</li>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <div style={{ textAlign: "right" }}>
          <button onClick={handleClose} className="icon-buttons">
            <CloseIcon color="action" />
          </button>
        </div>
        <DialogTitle>Create a new post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              multiline
              rows="3"
              placeholder="How are you today?"
              onChange={handleChange}
              fullWidth
            />
            <button type="submit">
              Submit
              {loading && (
                <CircularProgress className={classes.circularProgress} />
              )}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

NewPost.propTypes = {
  newPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { newPost, clearErrors })(NewPost);
