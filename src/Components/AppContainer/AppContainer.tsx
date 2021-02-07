import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import styles from './AppContainer.module.css';

// Components
import { Home } from '../Home/Home';
import { GpuComponent } from '../GpuComponent/GpuComponent';

export const AppContainer = () => {
  return (
    <div className={styles.appContainer}>
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link className={styles.navbarItem} to="/">
              CPU
            </Link>
          </li>
          <li>
            <Link className={styles.navbarItem} to="/gpu">
              Graphics
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.containerMonitor}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/gpu" component={GpuComponent} />
        </Switch>
      </div>
    </div>
  );
};
