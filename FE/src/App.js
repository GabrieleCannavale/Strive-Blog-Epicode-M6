import './App.css';
import LoginForm from './components/loginForm.jsx/LoginForm';
import NavigationBar from './components/navigationBar/NavigationBar';
import RegistrationAuthorForm from './components/registrationAuthorForm/RegistrationAuthorForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path='/' exact element={<LoginForm />}/>
        <Route path='/register' element={<RegistrationAuthorForm />} />
        <Route path='/homepage' element={<Homepage />} />        
      </Routes>

    </Router>
  );
}

export default App;
