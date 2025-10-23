import { Scale, Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';

const FooterBootstrap = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'الرئيسية', href: '#home' },
    { label: 'عن الدكتور', href: '#about' },
    { label: 'الخدمات', href: '#services' },
    { label: 'اتصل بنا', href: '#contact' },
  ];

  const legalLinks = [
    { label: 'سياسة الخصوصية', href: '#' },
    { label: 'الشروط والأحكام', href: '#' },
    { label: 'إخلاء المسؤولية', href: '#' },
  ];

  const socialLinks = [
    { icon: <Facebook size={24} />, href: '#', label: 'Facebook' },
    { icon: <Linkedin size={24} />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter size={24} />, href: '#', label: 'Twitter' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-5">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand Column */}
          <div className="col-md-6">
            <div className="d-flex align-items-center gap-3 mb-4">
              <Scale className="text-primary-custom" size={40} />
              <div>
                <h3 className="fs-3 fw-bold text-primary-custom mb-0">د. خيري الكباش</h3>
                <p className="small text-muted-custom mb-0">قاضي ودكتور في القانون</p>
              </div>
            </div>
            <p className="text-muted-custom mb-4 lh-base">
              خبرة قضائية وأكاديمية متميزة في القانون الجنائي وحقوق الإنسان تمتد لأكثر من 40 عاماً. 
              نقدم خدمات قانونية متكاملة للأفراد والمؤسسات.
            </p>
            
            {/* Contact Info */}
            <div className="d-flex flex-column gap-3">
              <a href="tel:00201112019430" className="text-decoration-none text-muted-custom d-flex align-items-center gap-3" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted-foreground)'}>
                <Phone size={18} />
                <span>00201112019430</span>
              </a>
              <a href="mailto:drkhairy4@gmail.com" className="text-decoration-none text-muted-custom d-flex align-items-center gap-3" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted-foreground)'}>
                <Mail size={18} />
                <span>drkhairy4@gmail.com</span>
              </a>
              <div className="d-flex align-items-start gap-3 text-muted-custom">
                <MapPin size={18} className="mt-1" style={{ flexShrink: 0 }} />
                <span>الإسكندرية - مصر</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h4 className="fs-5 fw-bold mb-4 text-primary-custom">روابط سريعة</h4>
            <ul className="list-unstyled d-flex flex-column gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="btn btn-link text-decoration-none text-muted-custom p-0 hover-translate"
                    style={{ transition: 'color 0.3s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted-foreground)'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-md-3">
            <h4 className="fs-5 fw-bold mb-4 text-primary-custom">معلومات قانونية</h4>
            <ul className="list-unstyled d-flex flex-column gap-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-decoration-none text-muted-custom hover-translate"
                    style={{ transition: 'color 0.3s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted-foreground)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-top" style={{ borderColor: 'rgba(198, 140, 55, 0.2) !important' }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <p className="text-muted-custom small text-center text-md-end mb-0">
              © {currentYear} د. خيري الكباش. جميع الحقوق محفوظة.
            </p>

            {/* Social Links */}
            <div className="d-flex align-items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-custom"
                  style={{ transition: 'all 0.3s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--primary-color)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted-foreground)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBootstrap;
