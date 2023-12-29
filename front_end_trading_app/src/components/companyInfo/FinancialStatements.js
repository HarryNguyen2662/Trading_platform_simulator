import React, { Component } from "react";
import { connect } from "react-redux";
import { getAdvStats, getKeyStats, getBalanceSheet, getCashFlow, getIncomeStatement } from "../../redux/actions/iexAction";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Range from "../graphs/Range";
import { formatStr, currencyFormat } from "../../redux/utility.js";
import Loading from "../Loading";

const styles = theme => ({
  root: {
    overflowY: "auto",
    height: "100%"
  },
  title: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
    fontSize: 24,
    color: "white" // Add this line to set the text color to white
  },
  tableContainer: {
    marginTop: theme.spacing(1),
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing(1),
    overflow: "auto"
  },
  tableHeaderCell: {
    backgroundColor: theme.palette.primary.main,
    color: "white", // Add this line to set the text color to white
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    padding: theme.spacing(1)
  },
  tableBodyCell: {
    textAlign: "center",
    padding: theme.spacing(1),
    color: "white" // Add this line to set the text color to white
  },
  tableHeaderRow: {
    backgroundColor: theme.palette.primary.light
  }
});

class FinancialStatements extends Component {
  state = {
    last: "?last=4",
    financials: "Advanced Stats",
    period: "Annual",
    periodList: ["Annual", "Quarter"],
    financialList: [
      "Advanced Stats",
      "Key Stats",
      "Cash Flow",
      "Balance Sheet",
      "Income Statement"
    ]
  };

  componentDidMount() {
    this.updateStatements();
  }

  componentDidUpdate(prevProps, prevState) {
    const { multi } = this.props;
    const { financials, last, period } = this.state;
    const query = last + "&period=" + period.toLowerCase();

    if (multi !== null && (multi !== prevProps.multi || financials !== prevState.financials || period !== prevState.period)) {
      this.updateStatements();
    }
  }

  updateStatements() {
    const { financials, last, period } = this.state;
    const query = last + "&period=" + period.toLowerCase();

    if (this.props.multi && this.props.multi[0]) {
      const sym = this.props.multi[0].value;
      switch (financials) {
        case "Advanced Stats":
          this.props.getAdvStats(sym);
          break;
        case "Key Stats":
          this.props.getKeyStats(sym);
          break;
        case "Balance Sheet":
          this.props.getBalanceSheet(sym, query);
          break;
        case "Cash Flow":
          this.props.getCashFlow(sym, query);
          break;
        case "Income Statement":
          this.props.getIncomeStatement(sym, query);
          break;
        default:
          break;
      }
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, this.updateStatements);
  };

  transformStatementData = (financials, oldStatement) => {
    const arr = [];

    if (oldStatement !== undefined) {
      if (financials === "Advanced Stats" || financials === "Key Stats") {
        for (const [key, value] of Object.entries(oldStatement)) {
          const formattedValue = !isNaN(Number(value))
            ? !Number.isInteger(Number(value))
              ? currencyFormat(Number(value), 2)
              : currencyFormat(Number(value), 0)
            : value === "0"
              ? ""
              : value;

          arr.push({ key, value: formattedValue });
        }
      } else {
        for (let i = 0; i < oldStatement.length; i++) {
          const subArr = [];
          for (const [key, value] of Object.entries(oldStatement[i])) {
            const formattedValue = !isNaN(Number(value))
              ? !Number.isInteger(Number(value))
                ? currencyFormat(Number(value), 2)
                : currencyFormat(Number(value), 0)
              : value === "0"
                ? ""
                : value;

            subArr.push({ key, value: formattedValue });
          }
          arr.push(subArr);
        }
      }
    }

    return arr;
  };

  render() {
    const { classes, advStats, keyStats, balanceSheet, cashFlow, incomeStatement } = this.props;
    const { financials, financialList, period, periodList } = this.state;
    const statement = {
      "Advanced Stats": advStats,
      "Key Stats": keyStats,
      "Balance Sheet": balanceSheet.balancesheet,
      "Cash Flow": cashFlow.cashflow,
      "Income Statement": incomeStatement.income
    };

    const arr = this.transformStatementData(financials, statement[financials]);

    return (
      <>
        {arr.length !== 0 ? (
          <div className={classes.root}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ flexBasis: "60%" }}>
                <Typography className={classes.title} gutterBottom>
                  <b>{financials}</b>
                </Typography>
              </span>
              {financials !== "Advanced Stats" && financials !== "Key Stats" && (
                <span>
                  <Range
                    handleRangeChange={this.handleChange}
                    name="period"
                    range={period}
                    list={periodList}
                  />
                </span>
              )}
              <span>
                <Range
                  handleRangeChange={this.handleChange}
                  name="financials"
                  range={financials}
                  list={financialList}
                />
              </span>
            </div>
            <Divider />
            <div className={classes.tableContainer}>
              <Table>
                {financials === "Advanced Stats" || financials === "Key Stats" ? (
                  <TableBody>
                    {arr.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className={classes.tableBodyCell}>
                          <i>{formatStr(row.key)}</i>
                        </TableCell>
                        <TableCell align="right" className={classes.tableBodyCell}>
                          {row.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <>
                    <TableHead>
                      <TableRow className={classes.tableHeaderRow}>
                        {arr.length > 0 &&
                          arr[0].map((header, i) => (
                            <TableCell key={i} className={classes.tableHeaderCell}>
                              <b>{formatStr(header.key)}</b>
                            </TableCell>
                          ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {arr.slice(1).map((row, i) => (
                        <TableRow key={i}>
                          {row.map((cell, j) => (
                            <TableCell key={j} align="right" className={classes.tableBodyCell}>
                              {cell.value}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </>
                )}
              </Table>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  advStats: state.iexReducer.advStats,
  keyStats: state.iexReducer.keyStats,
  balanceSheet: state.iexReducer.balanceSheet,
  cashFlow: state.iexReducer.cashFlow,
  incomeStatement: state.iexReducer.incomeStatement,
  multi: state.searchReducer.multi
});

const mapDispatchToProps = {
  getAdvStats,
  getKeyStats,
  getBalanceSheet,
  getCashFlow,
  getIncomeStatement
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FinancialStatements));
