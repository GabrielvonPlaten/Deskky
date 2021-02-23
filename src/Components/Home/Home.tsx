import { NONAME } from 'dns';
import { cpuUsage } from 'process';
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import styles from './Home.module.css';

export const Home: React.FC<any> = ({ CPU_INFO }) => {
  const options = {
    legend: 'none',
    chartArea: {
      left: 30,
      width: '90%',
    },
    width: '100%',
    height: '250px',
    enableInteractivity: false,
    title: 'CPU Load %',
    series: {
      0: { color: 'orange' },
      hAxis: {
        title: 'Seconds',
        gridlines: {
          count: 22,
        },
      },
      vAxis: {
        scaleType: 'log',
        title: 'CPU Load %',
        viewWindow: {
          min: 0,
          max: 100,
        },
      },
    },
  };

  const [chartData, setChartData] = useState([
    ['Usage', '%'],
    [0, 5.5],
    [1, 5.5],
    [2, 5.5],
    [3, 5.5],
    [4, 5.5],
    [5, 5.5],
    [6, 5.5],
    [7, 5.5],
    [8, 5.5],
    [9, 5.5],
    [10, 5.5],
    [11, 5.5],
    [12, 5.5],
    [13, 5.5],
    [14, 5.5],
    [15, 5.5],
    [16, 5.5],
    [17, 5.5],
    [18, 5.5],
    [19, 5.5],
    [20, 5.5],
    [21, 5.5],
    [22, 5.5],
    [23, 5.5],
    [24, 5.5],
    [25, 5.5],
    [26, 5.5],
    [27, 5.5],
    [28, 5.5],
    [29, 5.5],
    [30, 5.5],
    [31, 5.5],
    [32, 5.5],
    [33, 5.5],
    [34, 5.5],
    [35, 5.5],
    [36, 5.5],
    [37, 5.5],
    [38, 5.5],
    [39, 5.5],
    [40, 5.5],
    [41, 5.5],
    [42, 5.5],
    [43, 5.5],
    [44, 5.5],
    [45, 5.5],
    [46, 5.5],
    [47, 5.5],
    [48, 5.5],
    [49, 5.5],
    [50, 5.5],
    [51, 5.5],
    [52, 5.5],
    [53, 5.5],
    [54, 5.5],
    [55, 5.5],
    [56, 5.5],
    [57, 5.5],
    [58, 5.5],
    [59, 5.5],
    [60, 5.5],
  ]);

  console.log(chartData.length);

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
    </div>
  );
};