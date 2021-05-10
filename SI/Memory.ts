import si from 'systeminformation';

export const Memory_Info = async () => {
  return si.mem();
};
