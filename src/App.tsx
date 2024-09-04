// src/App.tsx
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './HightOrderFunction/Layout';
import { useEffect } from 'react';
import AppRoutes from './routes';

function App() {
  useEffect(() => {
    document.title = `FAMES BENIN`;
  }, []);

  return (
    <Router basename="/">
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
}

export default App;