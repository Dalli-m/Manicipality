import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}