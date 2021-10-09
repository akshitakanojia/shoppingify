import { useState } from 'react';
import { Switch, Route } from 'react-router';

import styles from './App.module.css'
import ProtectedRoute from './components/ProtectedRoute';
import RightPanel from './components/RightPanel/RightPanel'
import Sidenav from './components/Sidenav/Sidenav'
import History from './pages/History/History';
import Items from './pages/Items/Items';
import ListPage from './pages/List/ListPage';
import Signin from './pages/SignIn_SignUp/Signin';
import Stats from './pages/Stats/Stats';

function App() {
  const [showRightPanel, setShowRightPanel] = useState(false);

  return (
    <div className={styles.app}>
      <Switch>
        <Route path='/authorize' component={Signin} />
        <>
          <Sidenav setShowRightPanel={setShowRightPanel} />
          <div className={styles.main_wrapper}>
            <div className={styles.main}>
              <Switch>
                <ProtectedRoute exact path='/' render={() => <Items setShowRightPanel={setShowRightPanel} />} />
                <ProtectedRoute exact path='/history' component={History} />
                <ProtectedRoute exact path='/history/:slug' component={ListPage} />
                <ProtectedRoute exact path='/stats' component={Stats} />
              </Switch>
            </div>
            <RightPanel showRightPanel={showRightPanel} />
          </div>
        </>
      </Switch>
    </div>
  );
}

export default App;
