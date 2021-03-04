import React from 'react';
import styles from './GpuComponent.module.css';

export const GpuComponent: React.FC<any> = ({ GPU_INFO }) => {
  console.log(GPU_INFO);

  return (
    <div className={styles.container}>
      <h4 className={styles.gpuBrandName}>
        {GPU_INFO?.controllers?.lastItem.name}
      </h4>
    </div>
  );
};
