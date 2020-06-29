import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

// Material UI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

// redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

const Notifications = (props) => {
  const [anchorEl, setAnchorE1] = useState(null);

  const handleOpen = (e) => {
    setAnchorE1(e.target);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  const onMenuOpened = () => {
    let unreadNotificationsIds = props.notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);
    props.markNotificationsRead(unreadNotificationsIds);
  };

  const notifications = props.notifications;

  dayjs.extend(relativeTime);

  let notificationsIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter((not) => not.read === false).length > 0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter((not) => not.read === false).length
            }
            color="secondary"
          >
            <li className="notifications" onClick={handleOpen}>
              Notifications
            </li>
          </Badge>
        ))
      : (notificationsIcon = (
          <li className="notifications" onClick={handleOpen}>
            Notifications
          </li>
        ));
  } else {
    notificationsIcon = (
      <li className="notifications" onClick={handleOpen}>
        Notifications
      </li>
    );
  }
  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((not) => {
        const verb = not.type === "like" ? "liked" : "commented on";
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.read ? "primary" : "secondary";
        const icon =
          not.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={not.createdAt} onClick={handleClose}>
            {icon}
            <Link
              className="notification-links"
              to={`/users/${not.recipient}/post/${not.postId}`}
            >
              {not.sender} {verb} your post {time}
            </Link>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );
  return (
    <React.Fragment>
      {notificationsIcon}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </React.Fragment>
  );
};

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
