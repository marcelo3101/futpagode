import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import LoginPage from './Pages/login';
import RegisterPage from './Pages/register';
import HomePage from "./Pages/home";
import UserPage from "./Pages/user_home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/user_home" element={<UserPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
