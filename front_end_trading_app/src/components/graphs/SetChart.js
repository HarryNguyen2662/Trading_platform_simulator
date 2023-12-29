import React from "react";
import { connect } from "react-redux";
import { getChart, getIntraday } from "../../redux/actions/iexAction";
import Paper from "@material-ui/core/Paper";
import ChartSelect from "./ChartSelect";
import Loading from "../Loading";

class TradingViewWidget extends React.Component {

  componentDidMount() {
    this.getChart(this.props.multi, this.state.range);
    this.getIntraday(this.props.multi);
    this.timer = setInterval(() => this.addIntraDayData(), 1000);
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `{
      "width": "1600",
      "height": "800",
      "symbol": "NASDAQ:AAPL",
  "timezone": "Etc/UTC",
  "theme": "light",
  "style": "1",
  "locale": "en",
  "enable_publishing": true,
  "withdateranges": true,
  "range": "1M",
  "hide_side_toolbar": false,
  "allow_symbol_change": true,
  "details": true,
  "hotlist": true,
  "calendar": true,
  "studies": [
    "STD;Average%Day%Range"
  ],
  "support_host": "https://www.tradingview.com"
} `;

    this.container.appendChild(script);
  }

  state = {
    range: "",
    height: this.props.height,
    margin: { left: 60, right: 60, top: 30, bottom: 50 },
    intraDayData: []
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate(prevProps, prevState) {
    const { range } = this.state;
    const { multi } = this.props;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.getChart(multi, range);
      }
      if (range !== prevState.range) {
        this.setState((_prevState, props) => ({
          range: _prevState.range
        }));
        if (range !== "intraday") this.getChart(multi, range);
      }
    }
  }

  getChart = (symbol, range) => {
    if (symbol[0] !== undefined) this.props.getChart(symbol[0].value, range);
  };

  getIntraday = symbol => {
    if (symbol[0] !== undefined) this.props.getIntraday(symbol[0].value);
  };

  addIntraDayData = () => {
    this.getIntraday(this.props.multi);
    const { intraDayData } = this.state;
    const { intraday } = this.props;
    if (this.state.intraDayData.length === 0) {
      this.setState(state => ({
        intraDayData: state.intraDayData.concat(this.props.intraday)
      }));
    } else {
      if (
        intraDayData[intraDayData.length - 1].minute !==
        intraday[intraday.length - 1].minute
      ) {
        const data = [];
        data.push(intraday[intraday.length - 1]);
        this.setState(state => ({
          intraDayData: state.intraDayData.concat(data)
        }));
      }
    }
  };

  handleRangeChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="tradingview-widget-container" ref={el => this.container = el} style={{ height: "100%", width: "100%" }}>
        <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
        <div className="tradingview-widget-copyright">
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    chart: state.iexReducer.chart,
    intraday: state.iexReducer.intraday,
    multi: state.searchReducer.multi
  };
};

const mapDispatchToProps = {
  getChart,
  getIntraday
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradingViewWidget);

