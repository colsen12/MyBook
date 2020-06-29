import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import EditDetails from "./EditDetails.js";
import dayjs from "dayjs";

//Material UI
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

//redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions.js";

const Profile = (props) => {
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

  const {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated,
  } = props.user;

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    props.uploadImage(formData);
  };

  const handleLogout = () => {
    props.logoutUser();
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("newImage");
    fileInput.click();
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <div className="profile-container">
        <button className="edit-picture" onClick={handleEditPicture}>
          Edit picture
        </button>
        <img src={imageUrl} alt="profile" />
        <input
          hidden="hidden"
          id="newImage"
          type="file"
          onChange={handleImageChange}
        />
        <Link to={`/users/${handle}`} className="profile-handle">
          {handle}
        </Link>
        <hr />
        {bio && <p>{bio}</p>}
        <hr />
        {location && (
          <React.Fragment>
            <div>
              <LocationOn color="action" /> <span>{location}</span>
              <hr />
            </div>
          </React.Fragment>
        )}
        {website && (
          <React.Fragment>
            <div>
              <LinkIcon color="action" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </div>
          </React.Fragment>
        )}
        <div>
          <CalendarToday color="action" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <div className="edit-profile-container">
          <EditDetails />
        </div>
      </div>
    ) : (
      <div className="unlogged-user-profile">
        <h3>Please login or sign up to view profiles.</h3>
        <button>
          <Link className="profile-buttons" to="/login">
            Login
          </Link>
        </button>
        <button>
          <Link className="profile-buttons" to="/signup">
            Signup
          </Link>
        </button>
      </div>
    )
  ) : (
    <CircularProgress className={classes.circularProgress} size={200} />
  );

  return profileMarkup;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
