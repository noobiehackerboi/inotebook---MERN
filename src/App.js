import './App.css';
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NoteState from './context/notes/NoteState';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {

  // Alert State
  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState('light');
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = "#272727";
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = "white";
    }
  }

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  };

  return (
    <>
      <BrowserRouter>
        <NoteState>
          <Navbar mode={mode} toggleMode={toggleMode} showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
            <Routes>
              <Route path='/' element={
                <Home mode={mode} showAlert={showAlert} />}></Route>
              <Route path='/about' element={
                <About />}></Route>
              <Route path='/login' element={
                <Login mode={mode} showAlert={showAlert} />}></Route>
              <Route path='/signup' element={
                <SignUp mode={mode} showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </NoteState>
      </BrowserRouter>
    </>
  );
}

export default App;
