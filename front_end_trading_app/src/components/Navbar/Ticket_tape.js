import React from "react";
import { useEffect, useRef } from 'react';

class TicketTape extends React.Component {
    containerRef = React.createRef();
    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
        script.async = true;
        script.innerHTML = {
            "symbols": [
                {
                    "description": "TESLA, INC.",
                    "proName": "NASDAQ:TSLA"
                },
                {
                    "description": "APPLE INC.",
                    "proName": "NASDAQ:AAPL"
                },
                {
                    "description": "NVIDIA CORPORATION",
                    "proName": "NASDAQ:NVDA"
                },
                {
                    "description": "ADVANCED MICRO DEVICES, INC.",
                    "proName": "NASDAQ:AMD"
                },
                {
                    "description": "MICROSOFT CORPORATION",
                    "proName": "NASDAQ:MSFT"
                },
                {
                    "description": "AMAZON.COM, INC.",
                    "proName": "NASDAQ:AMZN"
                },
                {
                    "description": "META PLATFORMS, INC.",
                    "proName": "NASDAQ:META"
                },
                {
                    "description": "COINBASE GLOBAL, INC.",
                    "proName": "NASDAQ:COIN"
                },
                {
                    "description": "MARATHON DIGITAL HOLDINGS, INC.",
                    "proName": "NASDAQ:MARA"
                },
                {
                    "description": "ALPHABET INC.",
                    "proName": "NASDAQ:GOOGL"
                },
                {
                    "description": "NETFLIX, INC.",
                    "proName": "NASDAQ:NFLX"
                },
                {
                    "description": "NIO INC.",
                    "proName": "NYSE:NIO"
                },
                {
                    "description": "ALIBABA GROUP HOLDING LIMITED",
                    "proName": "NYSE:BABA"
                },
                {
                    "description": "PALANTIR TECHNOLOGIES INC.",
                    "proName": "NYSE:PLTR"
                },
                {
                    "description": "HDFC BANK",
                    "proName": "NSE:HDFCBANK"
                },
                {
                    "description": "INTEL CORPORATION",
                    "proName": "NASDAQ:INTC"
                },
                {
                    "description": "PAYPAL HOLDINGS, INC.",
                    "proName": "NASDAQ:PYPL"
                },
                {
                    "description": "RELIANCE INDS",
                    "proName": "NSE:RELIANCE"
                },
                {
                    "description": "AMC ENTERTAINMENT HOLDINGS, INC.",
                    "proName": "NYSE:AMC"
                }
            ],
            "showSymbolLogo": true,
            "isTransparent": false,
            "displayMode": "compact",
            "colorTheme": "light",
            "locale": "en"
        };
        this.containerRef.current.appendChild(script);
    }
    render() {

        return (
            <div className="tradingview-widget-container">
                <div ref={this.containerRef} className="tradingview-widget-container__widget">
                </div>
                <div className="tradingview-widget-copyright">
                </div>
            </div>
        );
    }

}

export default TicketTape;