import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing components and pages
import Home from './pages/Home';
import Navbar from './components/Navbar';
import UpdateForm from './pages/UpdateForm';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<UpdateForm />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
