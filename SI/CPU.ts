import si from 'systeminformation';
const { cpu, os } = require('node-os-utils');

export const CPU_Info = async () => {
  return si.cpu();
};

export const CPU_TEMP = async () => {
  return si.cpuTemperature();
};

export const CPU_TIME = async () => {
  return os.uptime();
};

export const CPU_USAGE = async () => {
  return cpu.usage().then((cpuPercentage: number) => {
    return cpuPercentage; // 10.38
  });
};

// Extra CPU information
// For testing purposes
export const Extra_CPU_Info = async () => {
  return si;
};
