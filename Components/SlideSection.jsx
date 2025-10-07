import React, { useEffect, useRef, useState } from 'react';

const SlideSection = ({ children, id, className, style = {}, slideDirection = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const getTransform = () => {
    if (!isVisible) {
      switch (slideDirection) {
        case 'left':
          return 'translateX(-100px)';
        case 'right':
          return 'translateX(100px)';
        case 'up':
          return 'translateY(80px)';
        case 'down':
          return 'translateY(-80px)';
        default:
          return 'translateY(80px)';
      }
    }
    return 'translateX(0) translateY(0)';
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={className}
      style={{
        ...style,
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        willChange: 'transform, opacity'
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '25px',
          padding: '3rem 2rem',
          margin: '2rem auto',
          maxWidth: '95%',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default SlideSection;