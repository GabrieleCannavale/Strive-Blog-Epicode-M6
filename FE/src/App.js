import './App.css';
import LoginForm from './components/loginForm/LoginForm';
import NavigationBar from './components/navigationBar/NavigationBar';
import RegistrationAuthorForm from './components/registrationAuthorForm/RegistrationAuthorForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>

       
        <Route path='/' exact element={<LoginForm />} /> 
        <Route path='/success/:token' element={<Success/>} />
       {/*  <Route path='/register' element={<RegistrationAuthorForm />} /> */}

        <Route element={<ProtectedRoutes />}>
          <Route path='/homepage' element={<Homepage />} />
        </Route>
        
      </Routes>

    </Router>
  );
}

export default App;
