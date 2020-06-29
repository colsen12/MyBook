import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types.js";
import { logoutUser, getUserData } from "./redux/actions/userActions.js";

//global style
import "./App.css";

//components import
import Toolbar from "./components/Toolbar/Toolbar.js";
import AuthRoute from "./util/AuthRoute";

//pages import
import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login.js";
import Signup from "./pages/Signup/Signup.js";
import User from "./pages/User/User.js";

axios.defaults.baseURL =
  "https://us-central1-social-media-6126c.cloudfunctions.net/api";

function App() {
  const token = localStorage.FBIdToken;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(logoutUser());
      window.location.href = "/login";
      localStorage.clear();
    } else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = token;
      store.dispatch(getUserData());
    }
  }

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Toolbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={Signup} />
            <Route exact path="/users/:handle" component={User} />
            <Route exact path="/users/:handle/post/:postId" component={User} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
