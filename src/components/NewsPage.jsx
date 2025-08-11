import React from 'react';
import './NewsPage.css';
import Header from './Header';
import Footer from './Footer';

import image3 from '../assets/image3.jpg'; 
import image4 from '../assets/image4.jpg'; 
import image5 from '../assets/image5.jpeg'; 
import image6 from '../assets/image6.jpg';
import image7 from '../assets/image7.jpg';
import image8 from '../assets/image8.jpg';

const NewsPage = () => {
  const newsArticles = [
    {
      id: 1,
      title: "New Community Center Opening",
      date: "June 15, 2023",
      category: "Community",
      excerpt: "The municipality is proud to announce the opening of our new community center with state-of-the-art facilities for all residents.",
      image: image3 
    },
    {
      id: 2,
      title: "Summer Festival Dates Announced",
      date: "June 10, 2023",
      category: "Festival",
      excerpt: "Mark your calendars for our annual summer festival happening next month with food, music, and activities for all ages.",
      image: image4 
    },
    {
      id: 3,
      title: "Road Construction Update",
      date: "May 28, 2023",
      category: "Construction",
      excerpt: "Phase 2 of the downtown revitalization project will begin next week. Expect minor detours on Main Street.",
      image: image5 
    },
    {
      id: 4,
      title: "Public Library Renovation Begins",
      date: "July 5, 2023",
      category: "Infrastructure",
      excerpt: "The historic downtown library will undergo a 3-month renovation starting next week, featuring new study rooms and digital resources.",
      image: image6
    },
    {
  id: 5,
  title: "Recycling Program Expands to Apartments",
  date: "July 12, 2023",
  category: "Environment",
  excerpt: "Starting August 1st, our curbside recycling service will include all multi-unit dwellings in the city limits.",
  image: image7
  
},
{
  id: 6,
  title: "Special Holiday Parking Enforcement",
  date: "July 18, 2023",
  category: "Public Notice",
  excerpt: "Free downtown parking will be extended during the summer festival week from July 25-31.",
  image: image8
}
  ];

  return (
    <div className="app">
      <Header />
      
      <main>
        <div className="news-page">
          <header className="news-page-header">
            <h1>Municipality News</h1>
            <p>Stay informed about the latest updates and events in our community</p>
          </header>

          <div className="news-archive">
            {newsArticles.map(article => (
              <article key={article.id} className="news-article">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="news-image"
                  onError={(e) => {
                    e.target.src = '/images/news-fallback.jpg'; 
                  }}
                />
                <div className="news-content">
                  <div className="news-meta">
                    <span className="news-date">{article.date}</span>
                    <span className="news-category">{article.category}</span>
                  </div>
                  <h3 className="news-title">{article.title}</h3>
                  <p className="news-excerpt">{article.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsPage;