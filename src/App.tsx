import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProfileSelection from './pages/ProfileSelection';
import SermonSubmission from './pages/SermonSubmission';
import Results from './pages/Results';
import CreateProfile from './pages/CreateProfile';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profiles" element={<ProfileSelection />} />
          <Route path="create-profile" element={<CreateProfile />} />
          <Route path="improvement-plan" element={<Dashboard />} />
          <Route path="resources" element={<Dashboard />} />
          <Route path="submit" element={<SermonSubmission />} />
          <Route path="results/:id" element={<Results />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;