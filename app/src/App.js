import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navbar/Navigation';
import TestPage from './pages/TestPage/TestPage';

import { Logging } from './context/context';
import { Authentification } from './context/context';
import { Team } from './context/context';
import { Name } from './context/context';

import LandingPage from './pages/LandingPage/LandingPage';
import ErgebnisPage from './pages/ErgebnisPage/ErgebnisPage';
import TeamResultPage from './pages/TeamResultPage/TeamResultPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  const [userID, setUserID] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [teamName, setTeam] = useState("")
  const [userName, setName] = useState("")

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

  useEffect(() => {
    const item = localStorage.getItem('team');
    if (item) {
      setTeam(item);
    }
  }, []);

  useEffect(() => {
    const item = localStorage.getItem('name');
    if (item) {
      setName(item);
    }
  }, []);

  // store items in local storage
  useEffect(() => {
    localStorage.setItem("userID", userID)
  }, [userID])

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn)
  }, [loggedIn])

  useEffect(() => {
    localStorage.setItem("team", teamName)
  }, [teamName])

  useEffect(() => {
    localStorage.setItem("name", userName)
  }, [userName])

  return (

    <div className='App'>

      <Logging.Provider value={{loggedIn, setLoggedIn}}>
      <Authentification.Provider value={{userID, setUserID}}>
      <Team.Provider value={{teamName, setTeam}}>
      <Name.Provider value={{userName, setName}}>


        <Navigation></Navigation>

        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route path="/test" element={<TestPage></TestPage>}></Route>
          <Route path="/ergebnis" element={<ErgebnisPage></ErgebnisPage>}></Route>
          <Route path="/teamergebnis" element={<TeamResultPage></TeamResultPage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        </Routes>

      </Name.Provider>
      </Team.Provider>
      </Authentification.Provider>
      </Logging.Provider>


    </div>

  );
}
export default App;