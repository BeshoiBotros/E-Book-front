import { useNavigate } from 'react-router-dom'; // Fix import to 'react-router-dom'
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // Consistent import

const AuthHeader = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'لوحة التحكم', href: '/dashboard' },
    { label: 'تسجيل خروج', href: '/login' },
    { label: 'الكتاب', href: '/book' },
    { label: 'الرئيسية', href: '/' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove('access');
    Cookies.remove('role')
    navigate("/login");
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    if (item.href === '/login') {
      e.preventDefault(); // Prevent default Link navigation for logout
      handleLogout();
    } else if (item.href.startsWith('#')) { // Only scroll if it's an anchor (fix mixed logic)
      e.preventDefault();
      scrollToSection(item.href);
    }
    // Otherwise, let <Link> handle route navigation
  };

  return (
    <header className={`${isScrolled ? 'scrolled' : ''}`} style={{ backgroundColor: '#2e1d0f' }}>
      <nav className="container py-3">
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo/Name */}
          <div className="fs-3 fw-bold text-primary-custom">
            د. خيري الكباش
          </div>

          {/* Desktop Navigation */}
          <div className="d-none d-md-flex align-items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                onClick={(e) => handleNavClick(e, item)}
                to={item.href}
                className="btn btn-link nav-link-custom text-decoration-none"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => scrollToSection('#ebook')}
              className="btn btn-primary-custom px-4"
            >
              احصل على الكتاب
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-link d-md-none text-white p-0"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="d-md-none mt-3 pb-3 animate-slide-up">
            <div className="d-flex flex-column gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  onClick={(e) => handleNavClick(e, item)} // Add consistent onClick
                  to={item.href}
                  className="btn btn-link nav-link-custom text-decoration-none text-end"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => scrollToSection('#ebook')}
                className="btn btn-primary-custom w-100"
              >
                احصل على الكتاب
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default AuthHeader;