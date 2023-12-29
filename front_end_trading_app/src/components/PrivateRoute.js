import React from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Routes } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Routes>
    <Route
      {...rest}
      render={props => {
        if (auth.loading) {
          console.log(12312312312313123123123123213213)
          return <div>loading...</div>
        }
        else if (!auth.isAuthenticated) {
          console.log(12312312312313123123123123213213)
          return <Navigate to="/dashboard" />;
        }
        else {
          console.log(12312312312313123123123123213213)
          return <element {...props} />;
        }
      }}
    />
  </Routes>
);

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(PrivateRoute);