import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  const [mapInstance, setMapInstance] = useState(null);

  return (
    <BrowserRouter>
      <Navbar map={mapInstance} />
      <Routes>
        <Route path="/" element={<Home onMapLoad={setMapInstance} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
