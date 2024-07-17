import { Briefcase, Users } from 'lucide-react';
import AnimatedElement from '../../function/AnimatedElement';

const Opportunities = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4 lg:px-32">
        <h2 className="text-3xl font-bold text-center mb-12">Opportunities</h2>
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          <p className="text-lg text-center md:text-left">
            At FAMES BENIN, we are committed to providing our members with an array of opportunities designed to enhance both their professional and personal lives. Our strong network and partnerships open doors to numerous avenues that help you grow and succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20">
          <AnimatedElement>
            <div className="card bg-white shadow-md p-6 flex items-center">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Briefcase className="h-12 w-12 text-accent mr-4" />
                  Job Opportunities
                </h3>
                <p className="text-gray-700">
                  FAMES BENIN offers a plethora of job opportunities across various industries. By joining our community, you get connected with top-tier companies looking for talented individuals like you. Whether you're a recent graduate or an experienced professional, we have positions that can match your skills and ambitions.
                </p>
                <div className="text-center mt-8">
                  <button className="btn btn-accent">Learn More</button>
                </div>
              </div>
            </div>
          </AnimatedElement>
          <AnimatedElement>
            <div className="card bg-white shadow-md p-6 flex items-center">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Users className="h-12 w-12 text-accent mr-4" />
                  Opportunities from Our Partners
                </h3>
                <p className="text-gray-700">
                  Through our extensive network of partners, FAMES BENIN provides exclusive opportunities for internships, collaborations, and special projects. These partnerships allow you to gain valuable experience, build your professional network, and develop skills that are crucial for your future success.
                </p>
                <div className="text-center mt-8">
                  <button className="btn btn-accent">Learn More</button>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}

export default Opportunities;
