import si from 'systeminformation';
const { cpu } = require('node-os-utils');

export const CPU_Info = async () => {
  return si.cpu();
};

export const CPU_USAGE = async () => {
  return cpu.usage().then((cpuPercentage: any) => {
    return cpuPercentage; // 10.38
  });
};
