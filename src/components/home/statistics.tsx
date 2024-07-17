import { Calendar, Users, MapPin, GraduationCap } from 'lucide-react';
import AnimatedElement from '../../function/AnimatedElement';

const Statistics = () => {
  return (
    <section className="py-10 bg-gray-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatedElement>
            <div className="card bg-white shadow-md p-6 text-center">
              <Calendar className="mx-auto h-12 w-12 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-2">Since</h3>
              <p className="text-3xl font-bold">2010</p>
            </div>
          </AnimatedElement>
          <AnimatedElement>
            <div className="card bg-white shadow-md p-6 text-center">
              <Users className="mx-auto h-12 w-12 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-2">Active Members</h3>
              <p className="text-3xl font-bold">292</p>
            </div>
          </AnimatedElement>
          <AnimatedElement>
            <div className="card bg-white shadow-md p-6 text-center">
              <MapPin className="mx-auto h-12 w-12 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-2">Active Cities</h3>
              <p className="text-3xl font-bold">12</p>
            </div>
          </AnimatedElement>
          <AnimatedElement>
            <div className="card bg-white shadow-md p-6 text-center">
              <GraduationCap className="mx-auto h-12 w-12 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-2">Graduates</h3>
              <p className="text-3xl font-bold">+3000</p>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}

export default Statistics;
