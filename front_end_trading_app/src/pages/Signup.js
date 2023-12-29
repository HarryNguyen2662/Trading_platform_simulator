import React from "react";
import { connect } from "react-redux";
import { signup } from "../redux/actions/authAction";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    if (password === confirmPassword) this.props.signup(username, email, password);
  };

  onChange = (prop) => (e) => this.setState({ [prop]: e.target.value });

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { username, email, password, confirmPassword } = this.state;
    const { error } = this.props;

    return (
      <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
        <form onSubmit={this.onSubmit}>
          <DialogContent>
            <Typography variant="h5" gutterBottom>
              Create an Account
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.onChange("username")}
                  autoFocus
                  margin="dense"
                  label="Username"
                  error={error !== null && error["username"] !== undefined}
                  helperText={error ? (error.username ? error.username : "Username is required") : ""}
                  autoComplete="username"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.onChange("email")}
                  margin="dense"
                  label="Email"
                  error={error !== null && error["email"] !== undefined}
                  helperText={error ? (error.email ? error.email : "Invalid email") : ""}
                  autoComplete="email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type={this.state.showPassword ? "text" : "password"}
                  label="Password"
                  value={password}
                  onChange={this.onChange("password")}
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          edge="end"
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={error !== null && error["password"] !== undefined}
                  helperText={error ? (error.password ? error.password : "Password is required") : ""}
                  autoComplete="new-password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type={this.state.showPassword ? "text" : "password"}
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={this.onChange("confirmPassword")}
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          edge="end"
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={password !== confirmPassword}
                  helperText={password !== confirmPassword ? "Passwords do not match!" : ""}
                  fullWidth
                  autoComplete="new-password"
                />
              </Grid>
              <Hidden xsDown>
                <Grid item xs={12}>
                  {/* Optionally hide content on smaller screens */}
                  {/* ... */}
                </Grid>
              </Hidden>
            </Grid>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Button color="primary" type="submit">
              Register
            </Button>
          </DialogActions>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
  };
};

const mapDispatchToProps = {
  signup: (username, email, password) => signup(username, email, password),
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
