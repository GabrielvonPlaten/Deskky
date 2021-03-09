import si from 'systeminformation';

export const Devices_Info = async () => {
  return si.usb();
};

export const Printer_Info = async () => {
  return si.printer();
};
