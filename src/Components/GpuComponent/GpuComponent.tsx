import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import styles from './GpuComponent.module.css';

export const GpuComponent: React.FC<any> = ({ GPU_INFO }) => {
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
        max: Math.round(GPU_INFO?.controllers?.lastItem.memoryTotal),
      },
    },
  };

  useEffect(() => {
    updateGpuHistogram();
  }, [GPU_INFO]);

  const [chartData, setChartData] = useState([
    ['Usage', '%'],
    [1, 0],
  ]);

  const updateGpuHistogram = () => {
    let newArr = [...chartData];
    // newArr.splice(1, 1);
    newArr.push([newArr.length, GPU_INFO?.controllers?.lastItem.memoryUsed]);

    setChartData(newArr);
  };

  const clearGraph = () => {
    const newArr = [...chartData];
    newArr.length = 3;
    setChartData(newArr);
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.gpuBrandName}>
        {GPU_INFO?.controllers?.lastItem.name}
      </h4>
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
            }).format(GPU_INFO?.controllers?.lastItem.memoryUsed)}
            {' / '}
            {new Intl.NumberFormat('de-DE', {
              style: 'unit',
              unit: 'gigabyte',
            }).format(GPU_INFO?.controllers?.lastItem.memoryTotal)}
          </p>
          <label>Temp.</label>
          <p>
            {new Intl.NumberFormat('de-DE', {
              style: 'unit',
              unit: 'celsius',
            }).format(GPU_INFO?.controllers?.lastItem.temperatureGpu)}
          </p>
          <label>Driver V.</label>
          <p>{GPU_INFO?.controllers?.lastItem.driverVersion}</p>
        </div>
        <div>
          <label>VRam</label>
          <p>
            {new Intl.NumberFormat('de-DE', {
              style: 'unit',
              unit: 'gigabyte',
            }).format(GPU_INFO?.controllers?.lastItem.vram)}
          </p>
          <label>Power</label>
          <p>
            {GPU_INFO?.controllers?.lastItem.powerDraw} /{' '}
            {GPU_INFO?.controllers?.lastItem.powerLimit} W
          </p>
        </div>
      </div>
    </div>
  );
};
