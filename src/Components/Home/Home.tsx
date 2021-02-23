import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import styles from './Home.module.css';

export const Home: React.FC<any> = ({ CPU_INFO, CPU_USAGE }) => {
  const options = {
    legend: 'none',
    chartArea: {
      left: 30,
      width: '100%',
    },
    height: '350px',
    lineWidth: 1,
    enableInteractivity: false,
    title: 'CPU Load %',
    series: {
      0: { color: 'orange', curveType: 'function' },
    },
    hAxis: {
      title: 'Seconds',
    },
    vAxis: {
      viewWindow: {
        min: 0,
        max: 100,
      },
    },
  };

  useEffect(() => {
    updateCpuHistogram();
  }, [CPU_USAGE]);

  const [chartData, setChartData] = useState([
    ['Usage', '%'],
    [1, 0],
  ]);

  const updateCpuHistogram = () => {
    let newArr = [...chartData];
    newArr.push([newArr.length, CPU_USAGE]);
    setChartData(newArr);
  };

  const clearGraph = () => {
    console.log('hello');

    const newArr = [...chartData];
    newArr.length = 3;
    setChartData(newArr);
  };

  return (
    <div className={styles.homeContainer}>
      <h4 className={styles.cpuBrandName}>{CPU_INFO?.brand}</h4>
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
    </div>
  );
};
