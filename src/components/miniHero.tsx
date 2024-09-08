import React, { useEffect, useState } from 'react';
import AnimatedElement from '../function/AnimatedElement';

interface MiniHeroProps {
  content: string;
}

const icons = [
  'fas fa-star',
  'fas fa-circle',
  'fas fa-square',
  'fas fa-heart',
  'fas fa-moon',
  'fas fa-sun',
  'fas fa-cloud',
//   'fas fa-bell',
//   'fas fa-flag',
  'fas fa-smile',
  'fas fa-star-of-life'
];

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandomIcons = () => {
  const numIcons = getRandomInt(8, 12);
  const positions: { top: number, left: number }[] = [];
  const iconElements = [];
  for (let i = 0; i < numIcons; i++) {
    let top: number, left: number;
    let overlap;

    do {
      top = getRandomInt(0, 90);
      left = getRandomInt(0, 90);
      overlap = positions.some(pos => Math.abs(pos.top - top) < 10 && Math.abs(pos.left - left) < 10);
    } while (overlap);

    // Ensure icons are not all clustered on one side
    if (i > 0) {
      const lastPosition = positions[positions.length - 1];
      if (Math.abs(lastPosition.left - left) < 20) {
        left = (left + 20) % 90; // Adjust position to avoid clustering
      }
    }

    positions.push({ top, left });

    const icon = icons[getRandomInt(0, icons.length - 1)];
    const size = getRandomInt(3, 7);

    iconElements.push(
      <i
        key={i}
        className={`${icon} text-white opacity-20 floating-icon`}
        style={{ position: 'absolute', top: `${top}%`, left: `${left}%`, fontSize: `${size}rem` }}
      ></i>
    );
  }

  return iconElements;
};

const MiniHero: React.FC<MiniHeroProps> = ({ content }) => {
  const [iconElements, setIconElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setIconElements(generateRandomIcons());
  }, []);

  return (
    <AnimatedElement>
    <div className="relative flex justify-center mb-5 bg-accent rounded-xl mx-5 py-20 px-5">
      <div className="absolute inset-0 flex justify-center items-center">
        {iconElements}
      </div>
      <h1 className="relative text-4xl lg:text-5xl font-bold text-center">{content}</h1>
    </div>
    </AnimatedElement>
  );
};

export default MiniHero;
