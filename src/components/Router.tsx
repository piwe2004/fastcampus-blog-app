import { useState } from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/home';
import PostList from 'pages/posts';
import PostNew from 'pages/posts/new';
import PostDetail from 'pages/posts/detail';
import PostEdit from 'pages/posts/edit';
import ProfilePage from 'pages/profile';
import LoginPage from 'pages/login';
import SignupPage from 'pages/signup';

interface RouterProps{
    isAuthenticated: boolean;
}

export default function Router({ isAuthenticated} : RouterProps) {
    
    return (
        <>
            <Routes>
                {!isAuthenticated ? (
                    <>
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/signup' element={<SignupPage />} />
                        <Route path='*' element={<Navigate replace to='/login' />} />
                    </>
                ) : (
                    <>
                        <Route path='/' element={<Home />} />
                        <Route path='/posts' element={<PostList />} />
                        <Route path='/posts/:id' element={<PostDetail />} />
                        <Route path='/posts/new' element={<PostNew />} />
                        <Route path='/posts/edit/:id' element={<PostEdit />} />
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='*' element={<Navigate replace to='/' />} />
                    </>
                )}
            </Routes>
        </>
    );
}