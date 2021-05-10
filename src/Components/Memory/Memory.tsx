import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import styles from './Memory.module.css';

export const Memory: React.FC<any> = ({ MEMORY_INFO }) => {
  const options = {
    title: 'Memory Used',
    legend: 'none',
    curveType: 'function',
    chartArea: {
      left: 40,
      width: '100%',
    },
    height: '375px',
    lineWidth: 1,
    enableInteractivity: false,
    series: {
      0: { color: '#ff9a35' },
    },
    hAxis: {
      title: 'Seconds',
    },
    vAxis: {
      viewWindow: {
        min: 0,
        max: Math.floor(MEMORY_INFO?.total / 1000000000),
      },
    },
  };

  useEffect(() => {
    updateGpuHistogram();

    // console.log(Math.floor(MEMORY_INFO?.available / 1000000000));
  }, [MEMORY_INFO]);

  const [chartData, setChartData] = useState([
    ['Usage', '%'],
    [1, 0],
  ]);

  const updateGpuHistogram = () => {
    let newArr = [...chartData];
    // newArr.splice(1, 1);
    newArr.push([newArr.length, Math.floor(MEMORY_INFO?.used / 1000000000)]);

    setChartData(newArr);
  };

  const clearGraph = () => {
    const newArr = [...chartData];
    newArr.length = 3;
    setChartData(newArr);
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Memory (RAM)</h4>
      <div className={styles.chartContainer}>
        <Chart
          chartType="AreaChart"
          options={options}
          data={chartData}
          legendToggle
        />
      </div>
      <button className="btn" onClick={() => clearGraph()}>
        Clear
      </button>
      <div className={styles.systemInformation}>
        <div>
          <label>Usage</label>
          {/* <p>
            {Math.floor(
              GPU_INFO?.controllers?.lastItem.memoryUsed / 100
            ).toFixed(2)}
          </p> */}
          <p>
            {new Intl.NumberFormat('de-DE', {
              style: 'unit',
              unit: 'gigabyte',
            }).format(Math.floor(MEMORY_INFO?.used / 1000000000))}
            {' / '}
            {new Intl.NumberFormat('de-DE', {
              style: 'unit',
              unit: 'gigabyte',
            }).format(Math.floor(MEMORY_INFO?.total / 1000000000))}
          </p>
        </div>
      </div>
    </div>
  );
};
