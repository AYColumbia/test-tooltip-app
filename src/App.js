import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Routes, Route, Navigate } from 'react-router-dom';
import TestComponent from './components/TestComponent';
import TestComponent2 from './components/TestComponent2';
import 'react-data-grid/lib/styles.css';
import './App.css';

function App() {
  const [crBlurb, setCrBlurb] = useState(<Fragment>Copyright &copy; 2024 AYColumbia</Fragment>)
  useEffect(() => {
  }, []);

  return (
    <>
    <div>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<TestComponent />} />
          <Route path="/T2" element={<TestComponent2 />} />
        </Routes>
      </Router>
    </div>
    <footer>{crBlurb}</footer>
    </>
  );
}

export default App;
