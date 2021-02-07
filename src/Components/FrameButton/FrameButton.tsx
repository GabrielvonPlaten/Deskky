import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import styles from './FrameButton.module.css';

interface FrameButton {
  icon: string;
  disabled?: boolean;
  action: string;
}

export const FrameButton: React.FC<FrameButton> = ({
  icon,
  disabled,
  action,
}) => {
  const onClick = (action: string) => {
    if (action === 'min') {
      ipcRenderer.send('mini-me');
    } else {
      ipcRenderer.send('close-app');
    }
  };

  return (
    <button
      className={styles.frameButton}
      disabled={disabled}
      onClick={() => onClick(action)}
    >
      {icon}
    </button>
  );
};
