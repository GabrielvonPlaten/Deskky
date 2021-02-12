import React, { useState, useEffect } from 'react';
import styles from './AppContainer.module.css';
import { ipcRenderer } from 'electron';

// Components
import { Home } from '../Home/Home';
import { GpuComponent } from '../GpuComponent/GpuComponent';

export const AppContainer = () => {
  const [CPU_INFO, SET_CPU_INFO] = useState<any>([]);
  const [buttons, setButtons] = useState<any>([
    {
      id: 0,
      name: 'Home',
      rName: 'home',
      active: true,
    },
    {
      id: 1,
      name: 'Graphics',
      rName: 'graphics',
      active: false,
    },
  ]);

  useEffect(() => {
    setInfo();
  }, []);

  const onClick = (id: number) => {
    let updatedButtons = buttons.map((btn: any) => {
      if (btn.id === id) {
        return { ...btn, active: !btn.active };
      }
      return btn;
    });

    setButtons(updatedButtons);
    console.log(buttons);
  };

  const setInfo = () => {
    ipcRenderer.on('CPU_INFO:get', (e, value) => {
      SET_CPU_INFO(value);
    });
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.sidebar}>
        <ul>
          {buttons.map((button: any) => (
            <li>
              <button key={button.id} onClick={() => onClick(button.id)}>
                {button.name} - {button.active ? 'ON' : 'OFF'}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.containerMonitor}>
        {buttons[0].active && <Home CPU_INFO={CPU_INFO} />}
        {buttons[1].active && <GpuComponent />}
      </div>
    </div>
  );
};
