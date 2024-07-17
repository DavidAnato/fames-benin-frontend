import { useEffect, useRef, ReactNode } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
}

const AnimatedElement = ({ children }: AnimatedElementProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(async entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
              await new Promise(resolve => setTimeout(resolve, 100));
              entry.target.classList.add('element-visible');
          }
        }
      });
      
    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

  }, []);

  return (
    <div ref={elementRef} className="element">
      {children}
    </div>
  );
};

export default AnimatedElement;
