import React from 'react';
import Hero from '../components/Hero';
import FeatureStats from '../components/FeatureStats';
import About100Devs from '../components/About100Devs';
import HowItWorks from '../components/HowItWorks';

export default function Home() {
  return (
    <>
      <Hero />
      <About100Devs />
      <HowItWorks />
      <FeatureStats />
    </>
  );
}
