import './App.css';
import LoginForm from './components/loginForm/LoginForm';
import RegistrationAuthorForm from './components/registrationAuthorForm/RegistrationAuthorForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import Success from './pages/Success';
import PostDetail from './components/postDetail/PostDetail' ;

function App() {
  return (
    <Router>
      <Routes>    
        <Route path='/' exact element={<LoginForm />} /> 
        <Route path='/success/:token' element={<Success/>} />
        <Route path='/registration' element={<RegistrationAuthorForm />} /> 

        <Route element={<ProtectedRoutes />}>
          <Route path='/postDetail/:id' element={<PostDetail/>}/>
          <Route path='/homepage' element={<Homepage />} />
        </Route>
        
      </Routes>

    </Router>
  );
}

export default App;
