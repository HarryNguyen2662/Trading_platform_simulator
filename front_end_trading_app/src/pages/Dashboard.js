import React from "react";
import Title from "../components/companyInfo/Title";
import SetChart from "../components/graphs/SetChart";
import FinancialStatements from "../components/companyInfo/FinancialStatements";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

class Dashboard extends React.Component {
  render() {
    const { multi } = this.props;

    if (multi === null) {
      return <CircularProgress />; // You can use a loading spinner or any other loading indicator here
    }

    const chartHeight = Math.floor(window.innerHeight / 4 * 2);
    const statsHeight = Math.floor(window.innerHeight / 4 * 1);

    return (
      <Paper
        elevation={3}
        style={{
          height: "90vh",
          overflowY: "scroll",
          padding: "20px",
          backgroundColor: "#f5f5f5", // Set your desired background color
          background: "linear-gradient(45deg, #00acc1, #673ab7)"
        }}
      >
        <Title />
        <Grid
          container
          spacing={3}
          style={{ marginTop: "20px" }}
        >
          <Grid item xs={12}>
            <SetChart height={chartHeight} />
          </Grid>
          <Grid item md={6}>
            <FinancialStatements type="Advanced Stats" height={statsHeight} />
          </Grid>
          <Grid item md={6}>
            <FinancialStatements type="Cash Flow" height={statsHeight} />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    multi: state.searchReducer.multi,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
