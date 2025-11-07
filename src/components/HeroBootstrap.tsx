import { Scale } from 'lucide-react';
import heroImage from '../assets/login-bg.jpg';

const HeroBootstrap = () => {

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
              المستشار الدكتور / خيرى أحمد الكباش
              <span className="d-block text-primary-custom mt-2 hero-header">أكثر من أربعة عقود فى خدمة العدالة, والفكر القانونى, واللإصلاح التشريعى.</span>
            </h1>

            {/* Subheading */}
            <p className="fs-4 text-muted-custom mb-4 lh-base hero-subheading">
              رئيس الاستئناف
              <br />
              الأمين العام السابق للّجنة العُليا للإصلاح التشريعي
              <br />
              الأمين العام للجمعية المصرية للطب والقانون
              <br />
              عُضو مجلس إدارة الجمعية المصرية للقانون الجنائي
              <br />
              رئيس نيابة العاصمة بالكويت سابقاً
              <br />
              رئيس الدائرة الاستئنافية الجزائية بأبو ظبي سابقاً
              <br />
              عُضو الهيئة العلمية لأكاديمية أبو ظبي القضائية سابقاً
              <br />
              رئيس لجنة السياسات والتشريعات في الاتحاد العربي للاقتصاد الرقمي

            </p>

            {/* Key Points */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="stat-card">
                  <p className="display-6 fw-bold text-primary-custom mb-1">+40</p>
                  <p className="small text-muted-custom"> عاماً من الخبرة القانونية</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="stat-card">
                  <p className="display-6 fw-bold text-primary-custom mb-1">+60</p>
                  <p className="small text-muted-custom">نشاطا قانونيا وقضائيا</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="stat-card">
                  <p className="display-6 fw-bold text-primary-custom mb-1">+10</p>
                  <p className="small text-muted-custom">مؤلفات علمية</p>
                </div>
              </div>
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
