import './NewsSection.css';

export default function NewsSection() {
  const newsItems = [
    {
      date: "June 28, 2024",
      title: "New Park Opens in Central District",
      content: "The new community park features playgrounds, walking trails, and picnic areas."
    },
    {
      date: "June 25, 2024",
      title: "Road Closure on Elm Street",
      content: "Elm Street will be closed for construction from July 1st to July 15th."
    },
    {
      date: "June 20, 2024",
      title: "Summer Concert Series Announced",
      content: "Enjoy free concerts every Friday evening in the town square throughout July."
    }
  ];

  return (
    <section className="news-section">
      <div className="news-container">
        <h2 className="section-title">Latest News</h2>
        
        <div className="news-list">
          {newsItems.map((item, index) => (
            <article key={index} className="news-item">
              <p className="news-date">{item.date}</p>
              <h3 className="news-title">{item.title}</h3>
              <p className="news-content">{item.content}</p>
              {index < newsItems.length - 1 && <hr className="news-divider" />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}