import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Cart from "./components/Cart";
import Profile from "./components/Profile";


function App() {
  return (
  <BrowserRouter>
  <Routes>
<Route exact path ="/" element={<Home/>}/>
<Route exact path ="/login" element={<Login/>}/>
<Route exact path ="/home" element={<Home/>}/>
<Route exact path ="/cart" element={<Cart/>}/>
<Route exact path ="/signup" element={<SignUp/>}/>
<Route exact path ="/profile" element={<Profile/>}/>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
