import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Post from "../../components/Post/Post.js";
import StaticProfile from "../../components/Profile/StaticProfile";
import "./User.css";

//Material UI
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

//redux
import { connect } from "react-redux";
import { getUserData } from "../../redux/actions/dataActions.js";

const User = (props) => {
  const [profile, setProfile] = useState(null);
  const [postIdParam, setPostIdParam] = useState(null);

  const loadingStyles = () => {
    return {
      circularProgress: {
        color: "#2d767f",
        display: "block",
        marginTop: "200px",
        marginLeft: "45%",
      },
    };
  };

  const classes = makeStyles(loadingStyles)();

  const { handle, postId } = props.match.params;

  const { getUserData } = props;

  useEffect(() => {
    const getProfile = () => {
      if (postId) setPostIdParam(postId);

      getUserData(handle);
      axios
        .get(`/user/${handle}`)
        .then((res) => {
          setProfile(res.data.user);
        })
        .catch((err) => console.log(err));
    };
    getProfile();
  }, [handle, postId, getUserData]);

  const { posts, loading } = props.data;

  const postsMarkup = loading ? (
    <CircularProgress className={classes.circularProgress} size={200} />
  ) : posts === null ? (
    <div className="no-posts-container">
      <div>
        <p className="no-posts-text">This user has no posts</p>
      </div>
    </div>
  ) : !postIdParam ? (
    posts.map((post) => (
      <Post key={post.postId} post={post} className="user-profile-posts" />
    ))
  ) : (
    posts.map((post) => {
      if (post.postId !== postIdParam)
        return (
          <Post key={post.postId} post={post} className="user-profile-posts" />
        );
      else
        return (
          <Post
            key={post.postId}
            post={post}
            openDialog
            className="user-profile-posts"
          />
        );
    })
  );

  return (
    <div className="user-page">
      <div>
        {profile === null ? (
          <CircularProgress className={classes.circularProgress} size={50} />
        ) : (
          <div className="static-profile-container">
            <StaticProfile profile={profile} />
          </div>
        )}
      </div>
      <div className="individual-post">{postsMarkup}</div>
    </div>
  );
};

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);
