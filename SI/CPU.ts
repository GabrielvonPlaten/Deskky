import si from 'systeminformation';
import { cpu } from 'node-os-utils';

export const CPU_Info = async () => {
  return si.cpu();
};
