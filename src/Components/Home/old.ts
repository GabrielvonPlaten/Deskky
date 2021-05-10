const [histogram, setHistogram] = useState<any>([]);

let cpuHistogram: any[] = [];
const cpuHistogramLength = 62;

useEffect(() => {
  populateHistogram();
  updateCpuHistogram(Math.round(CPU_USAGE));
}, [CPU_USAGE]);

const populateHistogram = () => {
  for (let i = 0; i < cpuHistogramLength; i++) {
    cpuHistogram[i] = [i, 1];
  }
};

const updateCpuHistogram = (CPU_USAGE: number) => {
  if (cpuHistogram.length >= cpuHistogramLength) {
    cpuHistogram.shift();
  }

  cpuHistogram.push([1, CPU_USAGE]);

  for (let i = 0; i < cpuHistogramLength; i++) {
    cpuHistogram[i][1] = i;
  }

  setHistogram(cpuHistogram);
  console.log(histogram);
};
