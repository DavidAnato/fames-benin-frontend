import famesLogo from '../../assets/images/logos/fames-logo.png';

const AboutUs = () => {
    return (
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-lg mx-auto md:mx-0 md:w-1/2">
            <img src={famesLogo} alt="FAMES Logo" className="mb-8 md:mb-0 mx-auto md:ml-0" />
          </div>
          <div className="max-w-lg mx-auto md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold text-center md:text-left mb-8">About Us</h2>
            <p className="text-lg leading-relaxed">
              FAMES BENIN, officially known as the Federation of Beninese Students and Interns in China, is a nonprofit, non-political, and secular organization. It operates throughout the entirety of Chinese territory and is dedicated to fostering continuous development solutions within the framework of Sino-Beninese cooperation.
            </p>
            <div className="mt-8 text-center md:text-left">
              <a href="#" className="btn btn-warning">Learn More</a>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default AboutUs;
  