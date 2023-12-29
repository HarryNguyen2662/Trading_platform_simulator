import React from "react";
import SetNews from "../components/news/SetNews";
import CompanyProfile from "../components/companyInfo/CompanyProfile";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Title from "../components/companyInfo/Title";

class Company extends React.Component {
  default = this.props.multi;

  render() {
    return (
      <div>
        {this.props.multi !== null ? (
          <Paper elevation={0} style={{ height: "95vh", overflowY: "scroll" }}>
            <Title />
            <Grid
              container
              spacing={8}
              wrap="wrap"
              justifyContent="space-between"
              style={{ padding: 10, position: "relative", zIndex: 1 }}
            >
              <Grid item xs={12} style={{ background: "linear-gradient(45deg, #00acc1, #673ab7)" }}>
                <CompanyProfile />
              </Grid>
              <Grid item xs={12}>
                <SetNews noOfNews={100} />
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <br />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    multi: state.searchReducer.multi
  };
};

export default connect(
  mapStateToProps,
  null
)(Company);
