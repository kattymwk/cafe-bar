import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Lab4 from './Lab4';
import Lab5 from './Lab5';
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/lab4" element={<Lab4/>} />
                <Route path="/lab5" element={<Lab5/>} />
            </Routes>
        </Router>
    );
}

export default App;
