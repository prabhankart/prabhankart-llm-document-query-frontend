import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="landing-page">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
