import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPanel from './components/UserPanel/LoginPanel';
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<LoginPanel />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
