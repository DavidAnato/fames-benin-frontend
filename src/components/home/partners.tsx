import { Briefcase, Globe, Users, Award } from 'lucide-react';
import AnimatedElement from '../../function/AnimatedElement';
const partners = [
  { icon: <Briefcase size={100} />, name: 'Partner 1', color: 'text-red-500' },
  { icon: <Globe size={100} />, name: 'Partner 2', color: 'text-blue-500' },
  { icon: <Users size={100} />, name: 'Partner 3', color: 'text-green-500' },
  { icon: <Award size={100} />, name: 'Partner 4', color: 'text-yellow-500' },
];

const Partners = () => {
  return (
    <section className="py-5 bg-gradient-to-r from-zinc-800 via-slate-800 to-zinc-700 text-white animate-bg">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
          {partners.map((partner, index) => (
            <AnimatedElement>
              <div className={`flex justify-center items-center ${partner.color}`}>
                  <div key={index} className="flex flex-col items-center m-4">
                {partner.icon}
              </div>
              <h2 className="text-lg font-semibold text-center mt-2">
                {partner.name}
              </h2>
            </div>
            </AnimatedElement>
          ))}
        </div>
    </section>
  );
}

export default Partners;
