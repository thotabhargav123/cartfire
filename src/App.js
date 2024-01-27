// import logo from './logo.svg';
import './App.css';
import Login from './components/Signin';
import SignUp from './components/Singup';
import { Routes, Route } from 'react-router-dom'
import { AuthcontextProvider } from './context/Authcontext';
import { MainApp } from './components/MainApp';
function App() {
  // const history =();
  return (
    <>
      <AuthcontextProvider>
        <Routes>
          <Route exact path='/' element={<MainApp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
      </AuthcontextProvider>

    </>
  );
}

export default App;
