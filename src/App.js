import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import FullMail from './components/FullMail';


function App() {

  return (
    <div className="App" >
      {/* <Signup /> */}
      <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} >
        </Route>
        <Route path="/full-mail/:id" element={<FullMail />} />
        </Routes>

    </div>
  )
}

export default App;
