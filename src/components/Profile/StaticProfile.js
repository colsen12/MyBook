import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// Material UI
import Paper from "@material-ui/core/Paper";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const StaticProfile = (props) => {
  const {
    profile: { handle, createdAt, imageUrl, bio, website, location },
  } = props;

  return (
    <Paper>
      <div className="user-page-profile">
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <div className="profile-details">
          <Link to={`/users/${handle}`} className="profile-handle">
            {handle}
          </Link>
          <hr />
          {bio && <p>{bio}</p>}
          <hr />
          {location && (
            <React.Fragment>
              <LocationOn color="action" /> <span>{location}</span>
              <hr />
            </React.Fragment>
          )}
          {website && (
            <React.Fragment>
              <LinkIcon color="action" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </React.Fragment>
          )}
          <CalendarToday color="action" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default StaticProfile;
