import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import TestPage from './pages/TestPage';

import { Logging } from './context/context';
import { Authentification } from './context/context';

import LandingPage from './pages/LandingPage';

function App() {
  const [userID, setUserID] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  // get items from local storage
  useEffect(() => {
    const item = localStorage.getItem('userID');
    if (item) {
      setUserID(item);
    }
  }, []);

  useEffect(() => {
    const item = localStorage.getItem('loggedIn');
    if (item) {
      setLoggedIn(item);
    }
  }, []);

  // store items in local storage
  useEffect(() => {
    localStorage.setItem("userID", userID)
  }, [userID])

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn)
  }, [loggedIn])




  return (

    <div className='App'>

      <Logging.Provider value={{loggedIn, setLoggedIn}}>
      <Authentification.Provider value={{userID, setUserID}}>

        <Navigation></Navigation>

        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route path="/test" element={<TestPage></TestPage>}></Route>
        </Routes>
        
      </Authentification.Provider>
      </Logging.Provider>


    </div>

  );
}
export default App;