import React from "react";
import "./Toolbar.css";
import PropTypes from "prop-types";

import NewPost from "../Post/NewPost.js";
import Notifications from "../Notifications/Notifications.js";
import logo from "../../assets/logo.png";

//redux
import { connect } from "react-redux";

const Toolbar = (props) => {
  const { authenticated } = props;

  return authenticated ? (
    <div>
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className="toolbar__logo">
            <a href="/">
              <img
                src={logo}
                style={{ height: "50px", width: "50px" }}
                alt="logo"
              />
            </a>
          </div>
          <div className="spacer" />
          <div className="toolbar_navigation-items">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <NewPost />
              <Notifications />
            </ul>
          </div>
        </nav>
      </header>
    </div>
  ) : (
    <div>
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className="toolbar__logo">
            <a href="/">
              <img
                src={logo}
                style={{ height: "50px", width: "50px" }}
                alt="logo"
              />
            </a>
          </div>
          <div className="spacer" />
          <div className="toolbar_navigation-items">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/signup">Signup</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

Toolbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Toolbar);
