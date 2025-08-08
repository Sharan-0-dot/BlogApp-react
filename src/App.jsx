import { Routes, Route } from 'react-router-dom';
import Login from "./Components/Login";
import Register from './Components/Register';
import Home from './Components/Home';
import About from './Components/About';
import Portfolio from './Components/Portfolio';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/portfolio" element={<Portfolio />}></Route>
    </Routes>
    </>
  );
}

export default App