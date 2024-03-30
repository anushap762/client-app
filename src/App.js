import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
// import {useState,useEffect} from 'react';
// import ArticleList from './components/ArticleList';
// import Form from './components/Form';

function App() {  
 return (
 <Router>
 <div>
  <Routes>
    <Route exact path='/' Component={Login}/>
    <Route path="/main" Component={Main} />
    <Route path='/logout' Component={Logout}/>
  </Routes>  
 </div>
 </Router>
 );
}

export default App;
