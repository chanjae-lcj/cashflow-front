import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

const TempChart = ({ company = 'LG전자' }) => {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        const API_URL = process.env.REACT_APP_STOCK_API_URL;
        const API_KEY = process.env.REACT_APP_STOCK_API_KEY;
        
        const fetchData2 = async () => {
            try{
                const response = await fetch(`${API_URL}?serviceKey=${API_KEY}&numOfRows=70&pageNo=1&resultType=json&itmsNm=${company}`);
                const result = await response.json();
                const stockItems = result.response.body.items.item;

                const ohlc = stockItems.map(stockData => [
                    moment(stockData.basDt, 'YYYYMMDD').valueOf(), // 날짜
                    parseFloat(stockData.mkp),  // 시가
                    parseFloat(stockData.hipr), // 고가
                    parseFloat(stockData.lopr), // 저가
                    parseFloat(stockData.clpr)  // 종가
                ]);

                const volume = stockItems.map(stockData => [
                    moment(stockData.basDt, 'YYYYMMDD').valueOf(), // 날짜
                    parseFloat(stockData.trqu),  // 거래량
                ]);

                setOptions({
                    rangeSelector: { selected: 4 },
                    title: { text: `${company} Historical` },
                    yAxis: [{
                        labels: { align: 'right', x: -3 },
                        title: { text: 'OHLC' },
                        height: '60%',
                        lineWidth: 2,
                        resize: { enabled: true }
                    }, {
                        labels: { align: 'right', x: -3 },
                        title: { text: 'Volume' },
                        top: '65%',
                        height: '35%',
                        offset: 0,
                        lineWidth: 2
                    }],
                    tooltip: { split: true },
                    series: [{
                        type: 'candlestick',
                        name: `${company} 가격`,
                        data: ohlc,
                        // color: 'red',        // 하락할 때 색상
                        // upColor: 'green',    // 상승할 때 색상
                        dataGrouping: {
                            units: [
                                ['week', [1]], ['month', [1, 2, 3, 4, 6]]
                            ]
                        }
                    }, {
                        type: 'column',
                        name: 'Volume',
                        data: volume,
                        yAxis: 1,
                        dataGrouping: {
                            units: [
                                ['week', [1]], ['month', [1, 2, 3, 4, 6]]
                            ]
                        }
                    }]
                });
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchData2();
        const intervalId = setInterval(fetchData2, 180000); // 3분마다 업데이트

        return () => clearInterval(intervalId);
    }, [company]);


    return (
        <div>
            {options && (
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={options}
                />
            )}
        </div>
    );
};

export default TempChart;
