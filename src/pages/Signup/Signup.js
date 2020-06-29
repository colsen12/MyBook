import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Signup.css";

//Material UI
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

//redux
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userActions";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");

  const loadingStyles = () => {
    return {
      circularProgress: {
        color: "white",
      },
    };
  };

  const classes = makeStyles(loadingStyles)();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
    };
    props.signupUser(newUserData, history);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const updateHandle = (e) => {
    setHandle(e.target.value);
  };

  return (
    <div className="login-container">
      <form className="login-form" noValidate onSubmit={handleSubmit} action="">
        <input
          type="email"
          value={email}
          onChange={updateEmail}
          placeholder="Email"
          className={props.UI.errors.email ? "red-box" : "normal-box"}
        />
        <p className="error-message">{props.UI.errors.email}</p>
        <input
          type="password"
          value={password}
          onChange={updatePassword}
          placeholder="Password (at least 6 char.)"
          className={props.UI.errors.password ? "red-box" : "normal-box"}
        />
        <p className="error-message">{props.UI.errors.password}</p>
        <input
          type="password"
          value={confirmPassword}
          onChange={updateConfirmPassword}
          placeholder="Confirm password"
          className={props.UI.errors.confirmPassword ? "red-box" : "normal-box"}
        />
        <p className="error-message">{props.UI.errors.confirmPassword}</p>
        <input
          type="text"
          value={handle}
          onChange={updateHandle}
          placeholder="Enter a username"
          className={props.UI.errors.handle ? "red-box" : "normal-box"}
        />
        <p className="error-message">{props.UI.errors.handle}</p>
        <button type="submit">
          {!props.UI.loading ? (
            "Signup"
          ) : (
            <CircularProgress className={classes.circularProgress} />
          )}
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>.
        </p>
      </form>
    </div>
  );
};

Signup.propTypes = {
  logoutUser: PropTypes.func,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(Signup);
