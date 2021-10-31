import { Switch, Route } from 'react-router';
import { toast } from 'react-toastify';

import styles from './App.module.css'
import ProtectedRoute from './components/ProtectedRoute';
import RightPanel from './components/RightPanel/RightPanel'
import Sidenav from './components/Sidenav/Sidenav'
import History from './pages/History/History';
import Items from './pages/Items/Items';
import ListPage from './pages/List/ListPage';
import Profile from './pages/Profile/Profile';
import Signin from './pages/SignIn_SignUp/Signin';
import Stats from './pages/Stats/Stats';

toast.configure()

function App() {

  return (
    <div className={styles.app}>
      <Switch>
        <Route path='/authorize' component={Signin} />
        <>
          <Sidenav />
          <div className={styles.main_wrapper}>
            <div className={styles.main}>
              <Switch>
                <ProtectedRoute exact path='/' component={Items} />
                <ProtectedRoute exact path='/history' component={History} />
                <ProtectedRoute exact path='/history/:slug' component={ListPage} />
                <ProtectedRoute exact path='/stats' component={Stats} />
                <ProtectedRoute exact path='/profile' component={Profile} />
              </Switch>
            </div>
            <RightPanel />
          </div>
        </>
      </Switch>
    </div>
  );
}

export default App;
