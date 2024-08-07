import { Link } from 'react-router-dom';

const UnderDevelopment = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <div className="animate-bounce mb-4">
        <i className="fas fa-laptop-code text-gray-700" style={{fontSize:"150px"}}></i>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Page under development</h1>
      <p className="mb-4 text-lg text-gray-600">This page is currently under development.</p>
      <Link to="/" className="btn btn-info">
        <i className="fas fa-home mr-2"></i> Back to home page
      </Link>
    </div>
  );
};

export default UnderDevelopment;
