import si from 'systeminformation';

export const GPU_Info = () => {
  return si.graphics();
};
