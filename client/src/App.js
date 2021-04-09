import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContextProvider from './contexts/AuthContext';
import axios from 'axios';
import Router from './components/Router';

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
