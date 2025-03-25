import logo from './logo.svg';
import './App.css';
// ****************************** 기존 코드 ***********

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element = {<DashboardPage />} />
      </Routes>
    </Router>
    
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;