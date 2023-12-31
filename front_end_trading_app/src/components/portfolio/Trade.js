import React from "react";
import { connect } from "react-redux";
import { addTrade } from "../../redux/actions/tradeAction";
import { getQuote } from "../../redux/actions/iexAction";
import { addFunds } from "../../redux/actions/fundsAction";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import { currencyFormat } from "../../redux/utility";

const styles = theme => ({
  root: {
    display: "flex",
    // flexWrap: "wrap",
    flexDirection: "column"
  },
  quantity: {
    textAlign: 'center',
    lineHeight: '3', // Điều chỉnh giá trị line-height theo nhu cầu của bạn
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60
  }
});

class Trade extends React.Component {
  state = {
    transaction: "",
    quantity: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { transaction, quantity } = this.state;
    const { multi, quote } = this.props;
    const owner = this.props.userData.id;
    const price = quote.latestPrice;
    let symbol;
    let company;
    if (multi !== null && multi[0] !== undefined) {
      symbol = multi[0].value;
      company = multi[0].name;
    }
    const trade = {
      symbol,
      company,
      transaction,
      quantity,
      price,
      owner
    };
    this.props.addTrade(trade);
    this.props.clickSubmit();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  buy = () => {
    const { quantity } = this.state;
    const { quote, funds } = this.props;
    const transactionType = "BUY";
    const price = quote.latestPrice;
    const oldFund = funds[funds.length - 1].totalFund;
    const amount = (price * quantity).toFixed(2);
    if (oldFund >= amount) {
      this.setState({ transaction: "BUY" });
      const totalFund = oldFund - amount;
      const fund = {
        transactionType,
        amount,
        totalFund
      };
      this.props.addFunds(fund);
    } else {
      alert("You have insufficient funds!");
    }
  };

  sell = () => {
    this.setState({ transaction: "SELL" });
    const { quantity } = this.state;
    const { quote, funds } = this.props;
    const transactionType = "SELL";
    const price = quote.latestPrice;
    const oldFund = funds[funds.length - 1].totalFund;
    const amount = price * quantity;
    const totalFund = (oldFund + amount).toFixed(2);
    const fund = {
      transactionType,
      amount,
      totalFund
    };
    this.props.addFunds(fund);
  };

  render() {
    const { multi, classes, quote } = this.props;
    const { quantity } = this.state;

    return (
      <div className={classes.root}>
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <b>TRADE</b>
        </div>
        <Divider />
        <form onSubmit={this.onSubmit} className={classes.form}>
          <DialogContent>
            <div className={classes.info}>
              Stock Symbol:{" "}
              {multi !== null && multi[0] !== undefined ? multi[0].value : ""}
            </div>
            <div className={classes.info}>
              Price:{" $"}
              <span style={{ color: "green" }}>
                {multi !== null ? currencyFormat(quote.latestPrice, 2) : ""}
              </span>
            </div>
            <div className={classes.quantity}>
              <span>Quantity:</span>
              <TextField
                id="quantity"
                variant="outlined"
                type="number"
                name="quantity"
                onChange={this.onChange}
                value={quantity}
                autoFocus
              />
            </div>
          </DialogContent>
          <Divider />
          <DialogActions className={classes.actions}>
            <Button
              fullWidth
              color="primary"
              type="submit"
              onClick={this.buy}
              variant="contained"
            >
              BUY
            </Button>
            <Button
              fullWidth
              color="secondary"
              type="submit"
              onClick={this.sell}
              variant="contained"
            >
              SELL
            </Button>
          </DialogActions>
        </form>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    userData: state.userReducer.userData,
    multi: state.searchReducer.multi,
    quote: state.iexReducer.quote,
    funds: state.fundsReducer.funds
  };
};

const mapDispatchToProps = {
  addTrade,
  getQuote,
  addFunds
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Trade));
