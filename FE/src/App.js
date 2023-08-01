import './App.css';
import NavigationBar from './components/navigationBar/NavigationBar';
import NewPostModal from './components/newPostModal/NewPostModal';
import RegistrationAuthorForm from './components/registrationAuthorForm/RegistrationAuthorForm';

function App() {
  return (
    <>
     <NavigationBar/>
     <RegistrationAuthorForm />
     <NewPostModal/>
    </>
  );
}

export default App;
