import React from 'react';
import famesLogo from '../assets/images/logos/fames-logo.png';
import AnimatedElement from '../function/AnimatedElement';

const PreFooterCard: React.FC = () => {
  return (
    <AnimatedElement>
    <div className="card w-[90%] h-[300px] mx-auto bg-success bg my-4 -mb-40 relative">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${famesLogo})`, backgroundSize: 'contain', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', filter: 'grayscale(100%)', opacity: 0.5 }}>
        </div>
        <div className="card-body relative z-10 flex flex-col justify-center items-center space-y-4">
            <span className='text-4xl text-white font-bold text-center px-16'>Join our community and explore incredible opportunities for growth and collaboration.</span>
            <a href="mailto:contact@famesbenin.com" className='btn btn-warning text-2xl rounded-xl'>
              <i className="fas fa-envelope mr-2"></i>Contact Us
            </a>
        </div>
    </div>
    </AnimatedElement>
  );
};

export default PreFooterCard;
