import React from 'react';
import Hero from "../components/home/hero";
import AboutUs from '../components/home/aboutUs';
import Statistics from '../components/home/statistics';
import Opportunities from '../components/home/opportunities';
import Galleries from '../components/home/galeries';
import News from '../components/home/news';
import Partners from '../components/home/partners';
import AnimatedElement from '../function/AnimatedElement';

const Home: React.FC = () => {
  return (
    <div>
        <section id="hero">
          <Hero/>
        </section>
      <AnimatedElement>
        <section id="about-us">
          <AboutUs/>
          <Statistics/>
        </section>
      </AnimatedElement>
      <AnimatedElement>
        <section id="opportunities">
          <Opportunities/>
        </section>
      </AnimatedElement>
      <AnimatedElement>
        <section id="gallery">
          <Galleries/>
        </section>
      </AnimatedElement>
      <AnimatedElement>
        <section id="testimonials">
          {/* Testimonials Section Content */}
        </section>
      </AnimatedElement>
      <AnimatedElement>
        <section id="upcoming-events">
          {/* Upcoming Events Section Content */}
        </section>
      </AnimatedElement>
      <AnimatedElement>
        <section id="contact-us">
          {/* Contact Us Section Content */}
        </section>
      </AnimatedElement>
      <AnimatedElement>
        <section id="partners">
          <Partners/>
        </section>
      </AnimatedElement>
      <AnimatedElement>
        <section id="news">
          <News/>
        </section>
      </AnimatedElement>
    </div>
  );
};

export default Home;
