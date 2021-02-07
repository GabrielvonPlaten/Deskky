import React from 'react';
import { FrameButton } from '../FrameButton/FrameButton';
import styles from './Frame.module.css';

export const Frame = () => {
  return (
    <div className={styles.frame}>
      <FrameButton icon="-" action="min" />
      <FrameButton icon="X" action="close" />
    </div>
  );
};
