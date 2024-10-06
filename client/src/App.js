import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';

import './App.css';


function App() {
  return (
    <div className="App">
       <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Login />} />

        
        {/* <Route path='/' element={<Signup />} /> */}
      </Routes>
    </div>
  );
}

export default App;
