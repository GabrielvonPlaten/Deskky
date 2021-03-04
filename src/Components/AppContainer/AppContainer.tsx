import React, { useState, useEffect } from 'react';
import styles from './AppContainer.module.css';
import { NavLink as Link, Switch, Route } from 'react-router-dom';
import { ipcRenderer } from 'electron';

// Components
import { Home } from '../Home/Home';
import { GpuComponent } from '../GpuComponent/GpuComponent';
import { Memory } from '../Memory/Memory';

export const AppContainer: React.FC = () => {
  const [CPU_INFO, SET_CPU_INFO] = useState<any[]>([]);
  const [CPU_USAGE, SET_CPU_USAGE] = useState<any[]>([]);
  const [GPU_INFO, SET_GPU_INFO] = useState<any[]>([]);
  const [routerLinks, setRouterLink] = useState<any>([
    { id: 0, name: 'Home', rName: '/' },
    { id: 1, name: 'Graphics', rName: '/graphics' },
    { id: 2, name: 'Memory', rName: '/memory' },
  ]);

  useEffect(() => {
    setInfo();
  });

  const setInfo = async () => {
    await ipcRenderer.on('CPU_INFO:get', (e, value) => {
      SET_CPU_INFO(value);
    });

    await ipcRenderer.on('CPU_USAGE:get', (e, value) => {
      SET_CPU_USAGE(value);
    });

    await ipcRenderer.on('GPU_INFO:get', (e, value) => {
      SET_GPU_INFO(value);
    });
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.sidebar}>
        <div className={styles.navbarItem__container}>
          <Link
            exact
            className={styles.navbarItem}
            activeStyle={{ background: 'rgba(255, 255, 255, 0.2)' }}
            to="/"
          >
            CPU
          </Link>
        </div>
        <div className={styles.navbarItem__container}>
          <Link
            className={styles.navbarItem}
            activeStyle={{ background: 'rgba(255, 255, 255, 0.2)' }}
            to="/graphics"
          >
            Graphics
          </Link>
        </div>
        <div className={styles.navbarItem__container}>
          <Link
            className={styles.navbarItem}
            activeStyle={{ background: 'rgba(255, 255, 255, 0.2)' }}
            to="/memory"
          >
            Memory
          </Link>
        </div>

        {/* {buttons.map((button: any) => (
            <li>
              <button key={button.id} onClick={() => onClick(button.id)}>
                {button.name} - {button.active ? 'ON' : 'OFF'} - {button.id}
              </button>
            </li>
          ))} */}
      </div>
      <div className={styles.containerMonitor}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Home CPU_INFO={CPU_INFO} CPU_USAGE={CPU_USAGE} />}
          />
          <Route
            path="/graphics"
            exact
            render={() => <GpuComponent GPU_INFO={GPU_INFO} />}
          />
          <Route path="/memory" exact component={Memory} />
        </Switch>
      </div>
    </div>
  );
};
