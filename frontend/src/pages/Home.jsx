import React from 'react';
import HomeBanner from '../componants/HomeBanner';
import ProjectList from '../componants/ProjectList';
import DevsProfiles from '../componants/DevsProfiles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedCursor from '../componants/AnimatedCursor';
import HowItWorks from '../componants/HowItWorks';

const AnimatedSection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 0 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col justify-center w-full">
      <AnimatedSection>
      <AnimatedCursor />
        <HomeBanner />
      </AnimatedSection>

      <AnimatedSection>
        <HowItWorks />
      </AnimatedSection>

      <AnimatedSection>
        <ProjectList />
      </AnimatedSection>

      <AnimatedSection>
        <DevsProfiles />
      </AnimatedSection>
    </div>
  );
};

export default Home;
