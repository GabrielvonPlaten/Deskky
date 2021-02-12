import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';

export const Home: React.FC<any> = ({ CPU_INFO }) => {
  useEffect(() => {
    console.log(CPU_INFO);
  });

  return (
    <div>
      <p>Hello</p>
      <h4 className={styles.cpuBrandName}>{CPU_INFO?.brand}</h4>
    </div>
  );
};
