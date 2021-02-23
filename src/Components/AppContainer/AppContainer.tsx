import React, { useState, useEffect } from 'react';
import styles from './AppContainer.module.css';
import { NavLink as Link, Switch, Route } from 'react-router-dom';
import { ipcRenderer } from 'electron';

// Components
import { Home } from '../Home/Home';
import { GpuComponent } from '../GpuComponent/GpuComponent';
import { Memory } from '../Memory/Memory';
import { getCPUUsage } from 'process';

export const AppContainer: React.FC = () => {
  const [CPU_INFO, SET_CPU_INFO] = useState<any>([]);
  const [CPU_USAGE, SET_CPU_USAGE] = useState<any>([]);
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
    console.log(CPU_INFO);

    await ipcRenderer.on('CPU_USAGE:get', (e, value) => {
      SET_CPU_USAGE(value);
    });
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link
              className={styles.navbarItem}
              activeClassName={styles.activeLink}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={styles.navbarItem}
              activeClassName={styles.activeLink}
              to="/graphics"
            >
              Graphics
            </Link>
          </li>
          <li>
            <Link
              className={styles.navbarItem}
              activeStyle={{ background: 'rgba(255, 255, 255, 0.2)' }}
              to="/memory"
            >
              Memory
            </Link>
          </li>
          {/* {buttons.map((button: any) => (
            <li>
              <button key={button.id} onClick={() => onClick(button.id)}>
                {button.name} - {button.active ? 'ON' : 'OFF'} - {button.id}
              </button>
            </li>
          ))} */}
        </ul>
      </div>
      <div className={styles.containerMonitor}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Home CPU_INFO={CPU_INFO} CPU_USAGE={CPU_USAGE} />}
          />
          <Route path="/graphics" component={GpuComponent} />
          <Route path="/memory" component={Memory} />
        </Switch>
      </div>
    </div>
  );
};
