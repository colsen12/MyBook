import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import "./Login.css";

//Material UI
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

//redux
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loadingStyles = () => {
    return {
      circularProgress: {
        color: "white",
      },
    };
  };

  const classes = makeStyles(loadingStyles)();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    props.loginUser(userData, history);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const { loading, errors } = props.UI;

  return (
    <div className="login-container">
      <form className="login-form" noValidate onSubmit={handleSubmit} action="">
        <input
          type="email"
          value={email}
          onChange={updateEmail}
          placeholder="Email"
          className={errors.email ? "red-box" : "normal-box"}
        />
        <p className="error-message">{errors.email}</p>
        <input
          type="password"
          value={password}
          onChange={updatePassword}
          placeholder="Password"
          className={errors.password ? "red-box" : "normal-box"}
        />
        <p className="error-message">{errors.password}</p>
        <button type="submit">
          {!loading ? (
            "Login"
          ) : (
            <CircularProgress className={classes.circularProgress} />
          )}
        </button>
        <p>
          If you don't have an account, sign up <Link to="/signup">here</Link>.
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
