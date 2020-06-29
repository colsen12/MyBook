import React, { useEffect } from "react";
import "./Home.css";
import PropTypes from "prop-types";

//Material UI
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

//components
import Post from "../../components/Post/Post.js";
import Profile from "../../components/Profile/Profile.js";

//redux
import { connect } from "react-redux";
import { getPosts } from "../../redux/actions/dataActions.js";

const Home = (props) => {
  const { getPosts } = props;
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const loadingStyles = () => {
    return {
      circularProgress: {
        color: "#2d767f",
        marginLeft: "50%",
        marginTop: "25%",
      },
    };
  };

  const classes = makeStyles(loadingStyles)();

  const { posts, loading } = props.data;
  let recentPostsMarkup = !loading ? (
    posts.map((post) => <Post key={post.postId} post={post} />)
  ) : (
    <CircularProgress className={classes.circularProgress} size={200} />
  );
  return (
    <div className="home-post">
      <div className="profile">
        <Profile />
      </div>
      <div className="individual-post">{recentPostsMarkup}</div>
    </div>
  );
};

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPosts })(Home);
