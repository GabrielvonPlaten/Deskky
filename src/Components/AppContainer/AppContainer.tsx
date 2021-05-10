import React, { useState, useEffect } from 'react';
import styles from './AppContainer.module.css';
import { NavLink as Link, Switch, Route } from 'react-router-dom';
import { ipcRenderer } from 'electron';

// Components
import { Home } from '../Home/Home';
import { GpuComponent } from '../GpuComponent/GpuComponent';
import { Memory } from '../Memory/Memory';
import { Devices } from '../Devices/Devices';

export const AppContainer: React.FC = () => {
  const [CPU_INFO, SET_CPU_INFO] = useState([]);
  const [CPU_USAGE, SET_CPU_USAGE] = useState([]);
  const [GPU_INFO, SET_GPU_INFO] = useState([]);
  const [MEMORY_INFO, SET_MEMORY_INFO] = useState([]);
  const [DEVICES, SET_DEVICES] = useState([]);
  const [routerLinks, setRouterLink] = useState<any>([
    { id: 0, name: 'CPU', rName: '/' },
    { id: 1, name: 'Graphics', rName: '/graphics' },
    { id: 2, name: 'Memory', rName: '/memory' },
  ]);

  useEffect(() => {
    setInfo();
    console.log(DEVICES);
  }, []);

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

    await ipcRenderer.on('Memory_INFO:get', (e, value) => {
      SET_MEMORY_INFO(value);
    });

    await ipcRenderer.on('Devices_INFO:get', (e, value) => {
      SET_DEVICES(value);
    });
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.navbar}>
        {routerLinks.map((link) => (
          <div className={styles.navbarItem__container}>
            <Link
              exact
              className={styles.navbarItem}
              activeStyle={{
                borderBottom: '2px solid rgba(255, 255, 255, 0.7)',
              }}
              to={link.rName}
            >
              {link.name}
            </Link>
          </div>
        ))}

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
          <Route
            path="/memory"
            exact
            render={() => <Memory MEMORY_INFO={MEMORY_INFO} />}
          />
          <Route path="/devices" exact render={() => <Devices />} />
        </Switch>
      </div>
    </div>
  );
};
