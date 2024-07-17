// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import News from './pages/News';
// import Opportunities from './pages/Opportunities';
// import Gallery from './pages/Gallery';
// import AboutUs from './pages/AboutUs';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import Logout from './pages/Logout';
import Layout from './HightOrderFunction/Layout';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    document.title = `FAMES BENIN`
    // document.
  })
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" Component={Home} />
          {/* <Route path="/news" Component={News} />
          <Route path="/opportunities" Component={Opportunities} />
          <Route path="/gallery" Component={Gallery} />
          <Route path="/about-us" Component={AboutUs} />
          <Route path="/profile" Component={Profile} />
          <Route path="/settings" Component={Settings} />
          <Route path="/logout" Component={Logout} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
