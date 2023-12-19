import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import NewProject from './pages/NewProject'
import EditProject from './pages/EditProject';

function App() {

  const users = JSON.parse(localStorage.getItem('user'))
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={users ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!users ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!users ? <Signup /> : <Navigate to="/" />}
            />
            <Route 
              path='/newProject'
              element={<NewProject />}
            />
            <Route path="/:idd" element={<EditProject/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;