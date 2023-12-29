import React, { Component } from 'react';

class StockHeatmap extends React.Component {
    constructor(props) {
        super(props);

        this.container = React.createRef();
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
        script.async = true;

        script.innerHTML = `{
      "exchanges": [],
      "dataSource": "SPX500",
      "grouping": "sector",
      "blockSize": "market_cap_basic",
      "blockColor": "change",
      "locale": "en",
      "symbolUrl": "",
      "colorTheme": "light",
      "hasTopBar": false,
      "isDataSetEnabled": false,
      "isZoomEnabled": true,
      "hasSymbolTooltip": true,
      "width": "100%",
      "height": "100%"
    }`;

        this.container.current.appendChild(script);
    }

    render() {
        return (
            <div className="tradingview-widget-container" ref={this.container}>
                <div className="tradingview-widget-container__widget"></div>

                <div className="tradingview-widget-copyright">
                    <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                        <span className="blue-text">Track all markets on TradingView</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default StockHeatmap;