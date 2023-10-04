import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/posts'>Posts</Link></li>
        <li><Link to='/posts:id'>Posts Detail</Link></li>
        <li><Link to='/posts/new'>Posts New</Link></li>
        <li><Link to='/posts/edit/:id'>Posts Edit</Link></li>
        <li><Link to='/profile'>Posts Edit</Link></li>
      </ul>
      <Routes>
        <Route path='/' element={<h1>Hello world</h1>} />
        <Route path='/posts' element={<h1>Posts List</h1>} />
        <Route path='/posts:id' element={<h1>Posts Detail page</h1>} />
        <Route path='/posts/new' element={<h1>Posts New page</h1>} />
        <Route path='/posts/edit/:id' element={<h1>Posts Edit Page</h1>} />
        <Route path='/profile' element={<h1>Profile</h1>} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </>
  );
}

export default App;
