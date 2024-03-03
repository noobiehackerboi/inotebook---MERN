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
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert} />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/login' element={<Login showAlert={showAlert} />}></Route>
              <Route path='/signup' element={<SignUp showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </NoteState>
      </BrowserRouter>
    </>
  );
}

export default App;
