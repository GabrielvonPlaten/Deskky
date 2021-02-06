import React from 'react';
import { FrameButton } from '../FrameButton/FrameButton';
import styles from './Frame.module.css';

export const Frame = () => {
  return (
    <div className={styles.frame}>
      <FrameButton icon="-" />
      <FrameButton icon="X" />
    </div>
  );
};
