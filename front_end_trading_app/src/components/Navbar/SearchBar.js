import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import { alpha } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { getSymbols } from "../../redux/actions/iexAction";
import { getSearchResult } from "../../redux/actions/searchAction";
import classNames from "classnames";
import AsyncSelect from "react-select/async";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import CancelIcon from "@material-ui/icons/Cancel";
import { emphasize } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  search: {
    position: "relative",
    zIndex: 2,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    margin: {
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      },
      padding: theme.spacing(1),
      boxShadow: theme.shadows[2],
      display: "flex",
      alignItems: "center",
    },
  },
  searchIcon: {
    width: theme.spacing(4),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  innerRoot: {
    flexGrow: 1
  },
  input: {
    display: "flex",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    width: "100%",
    height: "80%"
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing(1 / 2)}px ${theme.spacing(1 / 4)}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: theme.spacing(4.2),
    fontSize: 16,
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2)
  }
});



function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
        color: "Black",
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

const components = {
  Control,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  ValueContainer
};

class SearchBar extends React.Component {
  state = {
    multi: null
  };

  componentDidMount() {
    this.props.getSymbols();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.multi !== prevState.multi) {
      this.props.getSearchResult(this.state.multi);
    }
  }

  handleSearchChange = name => value => {
    this.setState({ [name]: value });
  };

  filterSymbols = searchSym => {
    let symbols = this.props.symbols.map(data => ({
      label: data.symbol,
      value: data.symbol,
      name: data.name
    }));
    return symbols.filter(i =>
      i.label.toUpperCase().includes(searchSym.toUpperCase())
    );
  };

  promiseOptions = searchSym => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.filterSymbols(searchSym));
      }, 1000);
    });
  };

  render() {
    const { multi } = this.state;
    let { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    return (
      <div className={classes.innerRoot}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <NoSsr>
            <AsyncSelect
              classes={classes}
              styles={selectStyles}
              textFieldProps={{
                InputLabelProps: {
                  shrink: true
                }
              }}
              loadOptions={this.promiseOptions}
              components={components}
              value={multi}
              onChange={this.handleSearchChange("multi")}
              placeholder="Search Stock Symbol..."
              isMulti
            />
          </NoSsr>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    multi: state.searchReducer.multi,
    symbols: state.iexReducer.symbols
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSearchResult: result => dispatch(getSearchResult(result)),
    getSymbols: () => dispatch(getSymbols())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SearchBar));
