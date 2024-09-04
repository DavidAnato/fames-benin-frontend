import React, { useEffect } from 'react';
import Hero from "../components/home/hero";
import AboutUs from '../components/home/aboutUs';
import Statistics from '../components/home/statistics';
import Opportunities from '../components/home/opportunities';
import Galleries from '../components/home/galeries';
import News from '../components/home/news';
import Partners from '../components/home/partners';
import AnimatedElement from '../function/AnimatedElement';
import GoogleConnectionToApi from '../utils/googleConnectionToApi';

const Home: React.FC = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const elementId = hash.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        const yOffset = -70;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div>
      <GoogleConnectionToApi/>
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
