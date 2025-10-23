import { Scale, Shield, FileText, Users, BookOpen, Gavel } from 'lucide-react';

const ServicesBootstrap = () => {
  const services = [
    {
      icon: <Gavel size={40} />,
      title: 'القانون الجنائي',
      description: 'خبرة واسعة في القضايا الجنائية والجنايات والجنح مع سجل حافل في المحاكم المصرية والعربية',
    },
    {
      icon: <Shield size={40} />,
      title: 'حقوق الإنسان',
      description: 'متخصص في قضايا حقوق الإنسان والحريات العامة وفقاً للمواثيق الدولية والمبادئ الدستورية',
    },
    {
      icon: <FileText size={40} />,
      title: 'الاستشارات القانونية',
      description: 'تقديم استشارات قانونية متخصصة في مختلف المجالات القانونية للأفراد والمؤسسات',
    },
    {
      icon: <BookOpen size={40} />,
      title: 'البحوث والدراسات',
      description: 'إعداد البحوث والدراسات القانونية المتخصصة والمذكرات القانونية',
    },
    {
      icon: <Users size={40} />,
      title: 'التدريب القضائي',
      description: 'برامج تدريبية متخصصة للقضاة والمحامين في الإجراءات الجنائية والقانون الدولي',
    },
    {
      icon: <Scale size={40} />,
      title: 'الإصلاح التشريعي',
      description: 'المشاركة في لجان الإصلاح التشريعي وتطوير القوانين والأنظمة القضائية',
    },
  ];

  const specializations = [
    'القانون الجنائي والإجراءات الجنائية',
    'حقوق الإنسان والحريات العامة',
    'القانون الدولي الجنائي',
    'مكافحة الإرهاب والجرائم المنظمة',
    'الجرائم الإلكترونية والتكنولوجية',
    'القانون الطبي والمسؤولية الطبية',
    'جرائم الفساد وغسيل الأموال',
    'قانون العمل الدولي',
    'التحكيم والصلح القضائي',
    'حماية البيئة والموارد الطبيعية',
  ];

  return (
    <section id="services" className="py-5 bg-gradient-primary">
      <div className="container py-5">
        {/* Section Header */}
        <div className="text-center mb-5 animate-slide-up">
          <h2 className="display-4 fw-bold mb-3">
            الخدمات <span className="text-primary-custom">القانونية</span>
          </h2>
          <p className="fs-5 text-muted-custom mx-auto" style={{ maxWidth: '800px' }}>
            خدمات قانونية متكاملة مبنية على خبرة قضائية وأكاديمية ممتدة لأكثر من 40 عاماً
          </p>
        </div>

        {/* Services Grid */}
        <div className="row g-4 mb-5">
          {services.map((service, index) => (
            <div key={index} className="col-md-6 col-lg-4 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card service-card h-100">
                <div className="card-body">
                  <div className="icon-wrapper text-primary-custom mb-4">
                    {service.icon}
                  </div>
                  <h3 className="card-title fs-5 fw-bold mb-3 text-primary-custom">{service.title}</h3>
                  <p className="text-muted-custom lh-base">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Specializations Section */}
        <div className="card about-card animate-slide-up">
          <div className="card-body p-4 p-md-5">
            <h3 className="fs-3 fw-bold mb-4 text-center">
              مجالات <span className="text-primary-custom">التخصص</span>
            </h3>
            <div className="row g-3">
              {specializations.map((spec, index) => (
                <div key={index} className="col-md-6">
                  <div className="d-flex align-items-center gap-3 info-section p-3 hover-translate">
                    <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary-color)', borderRadius: '50%', flexShrink: 0 }}></div>
                    <p className="mb-0">{spec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesBootstrap;
