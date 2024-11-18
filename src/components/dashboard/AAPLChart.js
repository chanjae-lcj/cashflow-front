// import React, { useEffect, useState } from 'react';
// import Highcharts from 'highcharts/highstock';
// import HighchartsReact from 'highcharts-react-official';

// const AAPLChart = () => {
//     const [options, setOptions] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             const data = await fetch('https://demo-live-data.highcharts.com/aapl-ohlcv.json')
//                 .then(response => response.json());

//             const ohlc = [];
//             const volume = [];
//             const dataLength = data.length;

//             // 데이터 분리
//             for (let i = 0; i < dataLength; i += 1) {
//                 ohlc.push([
//                     data[i][0], // 날짜
//                     data[i][1], // 시가
//                     data[i][2], // 고가
//                     data[i][3], // 저가
//                     data[i][4]  // 종가
//                 ]);

//                 volume.push([
//                     data[i][0], // 날짜
//                     data[i][5]  // 거래량
//                 ]);
//             }

//             // 차트 옵션 설정
//             setOptions({
//                 rangeSelector: { selected: 4 },
//                 title: { text: 'AAPL Chart' },
//                 yAxis: [{
//                     labels: { align: 'right', x: -3 },
//                     title: { text: 'OHLC' },
//                     height: '60%',
//                     lineWidth: 2,
//                     resize: { enabled: true }
//                 }, {
//                     labels: { align: 'right', x: -3 },
//                     title: { text: 'Volume' },
//                     top: '65%',
//                     height: '35%',
//                     offset: 0,
//                     lineWidth: 2
//                 }],
//                 tooltip: { split: true },
//                 series: [{
//                     type: 'candlestick',
//                     name: 'AAPL',
//                     data: ohlc,
//                     upColor: 'green', // 상승 색상
//                     color: 'red',     // 하락 색상
//                     dataGrouping: {
//                         units: [
//                             ['week', [1]], ['month', [1, 2, 3, 4, 6]]
//                         ]
//                     }
//                 }, {
//                     type: 'column',
//                     name: 'Volume',
//                     data: volume,
//                     yAxis: 1,
//                     upColor: 'green', // 상승 색상
//                     color: 'red',     // 하락 색상
//                     dataGrouping: {
//                         units: [
//                             ['week', [1]], ['month', [1, 2, 3, 4, 6]]
//                         ]
//                     }
//                 }]
//             });
//         };

//         fetchData();
//     }, []);

//     return (
//         <div>
//             {options && (
//                 <HighchartsReact
//                     highcharts={Highcharts}
//                     constructorType={'stockChart'}
//                     options={options}
//                 />
//             )}
//         </div>
//     );
// };
// export default AAPLChart;


import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const AAPLChart = () => {
    const [options, setOptions] = useState(null); // useState로 options와 setOptions 정의

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('https://demo-live-data.highcharts.com/aapl-ohlcv.json')
                .then(response => response.json());

            const ohlc = [];
            const volume = [];
            const dataLength = data.length;

            let previousClose = null;

            // 데이터 분리 및 색상 구분
            for (let i = 0; i < dataLength; i += 1) {
                const isRising = data[i][4] >= data[i][1]; // 종가 >= 시가
                const priceChange = previousClose ? data[i][4] - previousClose : 0; // 가격 변화량
                const priceChangePercent = previousClose ? ((priceChange / previousClose) * 100).toFixed(2) : 0; // 가격 변화 비율

                ohlc.push({
                    x: data[i][0], // 날짜
                    open: data[i][1],
                    high: data[i][2],
                    low: data[i][3],
                    close: data[i][4],
                    color: isRising ? 'rgba(0, 128, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)', // 연한 초록/빨강
                    priceChange: priceChange, // 가격 변화량
                    priceChangePercent: priceChangePercent // 가격 변화 비율
                });

                volume.push({
                    x: data[i][0], // 날짜
                    y: data[i][5], // 거래량
                    color: isRising ? 'rgba(0, 128, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)', // 연한 초록/빨강
                });

                previousClose = data[i][4]; // 이전 종가 저장
            }

            // 차트 옵션 설정
            setOptions({
                rangeSelector: { selected: 4 },
                title: { text: 'AAPL Chart' },
                yAxis: [
                    {
                        labels: { align: 'right', x: -3 },
                        title: { text: 'OHLC' },
                        height: '80%',   // 캔들 차트 영역을 80%로 늘림
                        lineWidth: 2,
                        resize: { enabled: true }
                    },
                    {
                        labels: { align: 'right', x: -3 },
                        title: { text: 'Volume' },
                        top: '85%',       // 볼륨 차트를 아래로 배치
                        height: '15%',    // 볼륨 차트 영역을 15%로 설정
                        offset: 0,
                        lineWidth: 2
                    }
                ],
                tooltip: {
                    split: true,
                    pointFormat: '<b>{series.name}</b><br>' +
                                'Open: {point.open}<br>' +
                                'High: {point.high}<br>' +
                                'Low: {point.low}<br>' +
                                'Close: {point.close}<br>' +
                                'Price Change: {point.priceChange}<br>' +
                                'Price Change (%): {point.priceChangePercent}%<br>' +
                                'Volume: {point.y}<br>'
                },
                series: [
                    {
                        type: 'candlestick',
                        name: 'AAPL',
                        data: ohlc,
                        dataGrouping: {
                            units: [
                                ['week', [1]],
                                ['month', [1, 2, 3, 4, 6]]
                            ]
                        }
                    },
                    {
                        type: 'column',
                        name: 'Volume',
                        data: volume,
                        yAxis: 1,
                        dataGrouping: {
                            units: [
                                ['week', [1]],
                                ['month', [1, 2, 3, 4, 6]]
                            ]
                        }
                    }
                ]
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

