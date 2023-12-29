import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from "@material-ui/icons/Dashboard";
import TimelineIcon from "@material-ui/icons/Timeline";
import DescriptionIcon from '@material-ui/icons/Description';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
    color: "#fff",
  },
  hide: {
    display: "none"
  },
  list: {
    width: 250,
    backgroundColor: "#1a1a1a", // Dark background color
  },
  listItem: {
    color: "#fff",
  },
  iconButton: {
    background: "linear-gradient(45deg, #00acc1, #673ab7)", // Gradient background
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(45deg, #2196F3, #673ab7)", // Gradient background on hover
    }
  }
});

class MainMenu extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    const sideList = (
      <div className={classes.list}>
        <List>
          <Button disabled>
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="Menu" />
            </ListItem>
          </Button>
        </List>
        <Divider />
        <List>
          {["Dashboard", "Chart", "Company", "Financials"].map((text, i) => (
            <Button
              key={i}
              fullWidth
              component={Link}
              to={`/${text.toLowerCase()}`}
            >
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  {i === 0 ? (
                    <IconButton variant="contained" className={classes.iconButton}>
                      <DashboardIcon />
                    </IconButton>
                  ) : i === 1 ? (
                    <IconButton variant="contained" className={classes.iconButton}>
                      <TimelineIcon />
                    </IconButton>
                  ) : i === 2 ? (
                    <IconButton variant="contained" className={classes.iconButton}>
                      <DescriptionIcon />
                    </IconButton>
                  ) : i === 3 ? (
                    <IconButton variant="contained" className={classes.iconButton}>
                      <AccountBalanceIcon />
                    </IconButton>
                  ) : (
                    <span />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Button>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <Tooltip disableFocusListener disableTouchListener title="Menu">
          <IconButton
            className={classes.menuButton}
            aria-label="Open drawer"
            onClick={this.handleDrawerOpen}
            onClose={this.handleDrawerClose}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Drawer open={open} onClose={this.handleDrawerClose} >
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleDrawerClose}
            onKeyDown={this.handleDrawerClose}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainMenu);
