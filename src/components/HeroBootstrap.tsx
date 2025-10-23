import { Download, Scale } from 'lucide-react';
import heroImage from '../assets/login-bg.jpg';

const HeroBootstrap = () => {
  const scrollToEbook = () => {
    const element = document.querySelector('#ebook');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section d-flex align-items-center">
      {/* Background Image with Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
        <img
          src={heroImage}
          alt="مكتب محاماة فخم"
          className="w-100 h-100 object-fit-cover"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="container position-relative" style={{ zIndex: 10 }}>
        <div className="row">
          <div className="col-lg-8 animate-fade-in">
            {/* Badge */}
            <div className="hero-badge mb-4">
              <Scale className="text-primary-custom" size={20} />
              <span className="text-primary-custom fw-semibold">خبرة قانونية متميزة</span>
            </div>

            {/* Main Heading */}
            <h1 className="display-2 fw-bold mb-4 lh-sm">
              شريكك القانوني
              <span className="d-block text-primary-custom mt-2">الموثوق</span>
            </h1>

            {/* Subheading */}
            <p className="fs-4 text-muted-custom mb-4 lh-base">
              القاضي الدكتور خيري الكباش - خبرة تمتد لعقود في القضاء والقانون الجنائي
              وحقوق الإنسان
            </p>

            {/* Key Points */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="stat-card">
                  <p className="display-6 fw-bold text-primary-custom mb-1">+40</p>
                  <p className="small text-muted-custom">عاماً من الخبرة</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="stat-card">
                  <p className="display-6 fw-bold text-primary-custom mb-1">+100</p>
                  <p className="small text-muted-custom">بحث ودراسة قانونية</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="stat-card">
                  <p className="display-6 fw-bold text-primary-custom mb-1">دولي</p>
                  <p className="small text-muted-custom">خبرة قضائية عربية</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3">
              <button
                onClick={scrollToEbook}
                className="btn btn-primary-custom btn-lg fs-5 fw-bold"
              >
                <Download className="ms-2" size={24} />
                احصل على الكتاب الإلكتروني
              </button>
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-outline-custom btn-lg fs-5 fw-bold"
              >
                تواصل معنا
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="position-absolute bottom-0 start-0 end-0" style={{ height: '128px', background: 'linear-gradient(to top, var(--background-dark), transparent)', zIndex: 10 }}></div>
    </section>
  );
};

export default HeroBootstrap;
