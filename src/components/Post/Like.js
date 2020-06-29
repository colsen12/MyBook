import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Material UI
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

//redux
import { connect } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/dataActions";

const Like = (props) => {
  const likedPost = () => {
    if (
      props.user.likes &&
      props.user.likes.find((like) => like.postId === props.postId)
    )
      return true;
    else return false;
  };

  const likeThisPost = () => {
    props.likePost(props.postId);
  };

  const unlikePost = () => {
    props.unlikePost(props.postId);
  };

  const { authenticated } = props.user;

  const like = !authenticated ? (
    <Link to="/login">
      <FavoriteBorder />
    </Link>
  ) : likedPost() ? (
    <FavoriteIcon onClick={unlikePost} />
  ) : (
    <FavoriteBorder onClick={likeThisPost} />
  );
  return like;
};

Like.propTypes = {
  user: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likePost,
  unlikePost,
};

export default connect(mapStateToProps, mapActionsToProps)(Like);
