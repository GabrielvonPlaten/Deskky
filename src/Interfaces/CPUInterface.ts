export interface CPU_INFO_Interface {
  CPU_INFO: {
    brand: string;
    speed: number;
    cores: number;
  };
}

export interface CPU_USAGE_Interface {
  CPU_USAGE: {
    cpuUsageData: number;
    cpuTime: number;
    cpuTemp: {
      min: number;
      max: number;
    };
  };
}
