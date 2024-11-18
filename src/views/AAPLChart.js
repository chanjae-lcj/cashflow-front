import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const AAPLChart = () => {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('https://demo-live-data.highcharts.com/aapl-ohlcv.json')
                .then(response => response.json());

            const ohlc = [];
            const volume = [];
            const dataLength = data.length;

            // 데이터 분리
            for (let i = 0; i < dataLength; i += 1) {
                ohlc.push([
                    data[i][0], // 날짜
                    data[i][1], // 시가
                    data[i][2], // 고가
                    data[i][3], // 저가
                    data[i][4]  // 종가
                ]);

                volume.push([
                    data[i][0], // 날짜
                    data[i][5]  // 거래량
                ]);
            }

            // 차트 옵션 설정
            setOptions({
                rangeSelector: { selected: 4 },
                title: { text: 'AAPL Historical' },
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
                    name: 'AAPL',
                    data: ohlc,
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
        };

        fetchData();
    }, []);

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

export default AAPLChart;
