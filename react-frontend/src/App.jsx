import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import WELCOME from './pages/welcome';
import HOME from './pages/home';
import SplashCursor from './components/splashcursor';
import TRACKER from './pages/tracker';
import GROUP from './pages/group';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ONBOARD from './pages/onboard';
import useAuthUser from './hooks/useAuthUser';
import Call from './pages/call';

function App() {
  const { isLoading, authUser } = useAuthUser();
  console.log(authUser, " so the user is  ");
  //
  const isAuthenticated = Boolean(authUser);
  const isOnboarder = authUser?.isOnboarded;
  console.log(isAuthenticated, isOnboarder);

  if (isLoading) {
    return <div style={{ 
      backgroundColor: 'black', 
      color: 'white',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1.5rem'
    }}>Loading...</div>
  }

  return <>
    {/* <SplashCursor /> */}
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            !isAuthenticated ? (
              <WELCOME />
            ) : <Navigate to={!isOnboarder  ? '/onboard' : '/home'} />
          } />
          
          <Route path="/home" element={isAuthenticated&&isOnboarder ? <HOME /> : <Navigate to="/" />} />
            <Route path='/onboard' element={isAuthenticated&&!isOnboarder ? <ONBOARD /> : <Navigate to="/" />} />
          <Route path="/tracker" element={isAuthenticated&&isOnboarder ? <TRACKER /> : <Navigate to="/" />} />
          <Route path="/group/:id" element={isAuthenticated&&isOnboarder ? <GROUP /> : <Navigate to="/" />} />
           <Route path="/call/:id" element={isAuthenticated&&isOnboarder ? <Call /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
}


export default App