import React from 'react';
import styles from './FrameButton.module.css';

interface FrameButton {
  icon: string;
  disabled?: boolean;
}

export const FrameButton: React.FC<FrameButton> = ({ icon, disabled }) => {
  return (
    <button className={styles.frameButton} disabled={disabled}>
      {icon}
    </button>
  );
};
