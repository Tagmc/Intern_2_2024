import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation, redirect } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { useDispatch } from 'react-redux';
import { PrimeReactProvider } from 'primereact/api';
// import { AppHelperComponent } from './helper/AppHelper';
import Home from './page/Home';
import Weather from './page/Weather';
import Maps from './page/Maps';
import Camera from './page/Camera';
import { GlobalDebug } from './remove-consoles';

function App() {

  // const [init, setInit] = useState(false)

  const value = {
    ripple: true
  }

  const toast = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
      // GlobalDebug(false);
  }, []);

  return (
    <PrimeReactProvider value={value}>
      <BrowserRouter>
        {/* <AppHelperComponent /> */}
        <div className='App'>
          <div className='sx-layout'>
            <div className='sx-layout-center'>
              <ScrollToTop>
                <Routes>
                  <Route path={'/'} element={<Home />} />
                  <Route path={'/weather'} element={<Weather />} />
                  <Route path={'/maps'} element={<Maps />} />
                  <Route path={'/camera'} element={<Camera />} />
                </Routes>
              </ScrollToTop>
            </div>
          </div>
        </div>
        <Toast ref={toast} />

      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

