import { useEffect, useState, useContext } from 'react';
import { app } from 'firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeContext from 'context/ThemeContext';

import Footer from './components/Footer';
import Header from './components/Header';
import Router from './components/Router';
import Loader from 'components/Loader';



function App() {
  const context = useContext(ThemeContext);
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false);
      }
      setInit(true)
    });
  }, [auth])

  return (
    <>
    {
      init
      ? <>
        <div className={context.theme === 'light' ? 'white' : 'dark'}>
          <ToastContainer />
          <Header />
            <Router isAuthenticated={isAuthenticated} />
          <Footer />
        </div>
      </>
      : <Loader />
      }
    </>
  );
}

export default App;
