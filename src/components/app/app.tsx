import { ConstructorPage, Feed, NotFound404 } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Routes, Route } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <Routes>
      <Route path='*' element={<NotFound404 />}/>
      <Route path='/' element={<AppHeader />} />
      <Route path='/constructor-page' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />}/>
    </Routes>
  </div>
);

export default App;
