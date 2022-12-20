import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing components and pages
import Home from './pages/Home';
import Navbar from './components/Navbar';
import UpdateWorkout from './components/UpdateForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/updateworkouts/:id" element={<UpdateWorkout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
