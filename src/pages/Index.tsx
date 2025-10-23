import Header from '../components/HeaderBootstrap';
import Hero from '../components/HeroBootstrap';
import About from '../components/About';
import Services from '../components/ServicesBootstrap';
import EbookSection from '../components/EbookSectionBootstrap';
import Footer from '../components/FooterBootstrap';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <EbookSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
