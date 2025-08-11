import React from 'react';
import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import ExploreTown from '../components/ExploreTown';  
import ServicesPreview from '../components/ServicesPreview';
import NewsSection from '../components/NewsSection';

const Home = () => {
  return (
    <div className="home-main">
      <Header />
      
      <main>
        <HeroBanner />
        
        
        <ExploreTown />
        
        <ServicesPreview />
        <NewsSection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;