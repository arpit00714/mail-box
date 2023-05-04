import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

function App() {

  return (
    <div className="App" >
      {/* <Signup /> */}
      <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>

    </div>
  )
}

export default App;
