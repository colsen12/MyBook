import React, { useState } from "react";
import PropTypes from "prop-types";

//Material UI
import TextField from "@material-ui/core/TextField";

// Redux stuff
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const CommentForm = (props) => {
  const [body, setBody] = useState("");

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitComment(props.postId, { body: body });
    setBody("");
  };

  const { authenticated } = props;

  const commentFormMarkup = authenticated ? (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          placeholder="Comment"
          value={body}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <hr className="last-hr" />
    </div>
  ) : null;
  return commentFormMarkup;
};

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(CommentForm);
