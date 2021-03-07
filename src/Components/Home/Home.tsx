import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import styles from './Home.module.css';

export const Home: React.FC<any> = ({ CPU_INFO, CPU_USAGE }) => {
  const options = {
    title: 'CPU Load %',
    legend: 'none',
    curveType: 'function',
    chartArea: {
      left: 30,
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
        max: 100,
      },
    },
  };

  useEffect(() => {
    if (CPU_USAGE.cpuUsageData) {
      updateCpuHistogram();
    }
  }, [CPU_USAGE]);

  const [chartData, setChartData] = useState([
    ['Usage', '%'],
    [1, 0],
  ]);

  const updateCpuHistogram = () => {
    let newArr = [...chartData];
    newArr.push([newArr.length, CPU_USAGE.cpuUsageData]);

    setChartData(newArr);
  };

  const clearGraph = () => {
    const newArr = [...chartData];
    newArr.length = 3;
    setChartData(newArr);
  };

  const convertUpTime = (time: number): string => {
    time = +time;
    const d = Math.floor(time / (3600 * 24));
    const h = Math.floor((time % (3600 * 24)) / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = Math.floor(time % 60);

    return `${d}d, ${h}h, ${m}m, ${s}s`;
  };

  return (
    <div className={styles.container}>
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
      <div className={styles.systemInformation}>
        <div>
          <label>Usage</label>
          <p>{Math.round(CPU_USAGE.cpuUsageData)}%</p>
          <label>Speed</label>
          <p>{CPU_INFO?.data?.speed} GHz</p>
          <label>Cores</label>
          <p>{CPU_INFO?.data?.cores}</p>
        </div>
        <div>
          {CPU_USAGE?.cpuTime && (
            <>
              <label>Uptime</label>
              <p>{convertUpTime(CPU_USAGE?.cpuTime)}</p>
            </>
          )}
          {CPU_INFO?.cpuTemp?.min && (
            <>
              <label>Temp.</label>
              <p>
                {new Intl.NumberFormat('de-DE', {
                  style: 'unit',
                  unit: 'celsius',
                }).format(CPU_INFO?.cpuTemp?.min)}{' '}
                /
                {new Intl.NumberFormat('de-DE', {
                  style: 'unit',
                  unit: 'celsius',
                }).format(CPU_INFO?.cpuTemp?.max)}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
