import { Download, BookOpen, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const EbookSectionBootstrap = () => {
  const handleDownload = () => {
    toast.success('شكراً لاهتمامك! سيتم إرسال رابط التحميل إلى بريدك الإلكتروني قريباً.', {
      duration: 5000,
    });
  };

  const ebookFeatures = [
    'دليل شامل لحقوق الإنسان في النظام القضائي',
    'شرح مفصل للإجراءات الجنائية',
    'أمثلة عملية من الخبرة القضائية',
    'نصائح قانونية للأفراد والمؤسسات',
    'تحليل للمواثيق الدولية وتطبيقاتها',
  ];

  return (
    <section id="ebook" className="py-5 bg-gradient-card ebook-section">
      {/* Decorative Elements */}
      <div className="ebook-decorative ebook-decorative-1"></div>
      <div className="ebook-decorative ebook-decorative-2"></div>

      <div className="container py-5 position-relative" style={{ zIndex: 10 }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card about-card animate-slide-up overflow-hidden" style={{ border: '2px solid rgba(198, 140, 55, 0.3)' }}>
              <div className="card-body p-4 p-md-5" style={{ background: 'linear-gradient(to left, rgba(198, 140, 55, 0.1), transparent)' }}>
                <div className="row g-4 align-items-center">
                  {/* Left Column - Content */}
                  <div className="col-md-6">
                    <div className="badge-custom d-inline-flex align-items-center gap-2 mb-4">
                      <BookOpen className="text-primary-custom" size={20} />
                      <span>عرض خاص</span>
                    </div>

                    <h2 className="display-5 fw-bold mb-3 text-primary-custom">
                      احصل على كتابك
                      <span className="d-block text-primary-custom mt-2">الإلكتروني</span>
                    </h2>

                    <p className="fs-5 text-muted-custom mb-4 lh-base">
                      دليلك الشامل لفهم القانون الجنائي وحقوق الإنسان من خلال خبرة قضائية تمتد لأكثر من 40 عاماً
                    </p>

                    <div className="mb-4">
                      {ebookFeatures.map((feature, index) => (
                        <div key={index} className="d-flex align-items-start gap-3 mb-3">
                          <CheckCircle className="text-primary-custom mt-1" size={20} style={{ flexShrink: 0 }} />
                          <p className="mb-0">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleDownload}
                      className="btn btn-primary-custom btn-lg fs-5 fw-bold w-100 w-md-auto mb-3"
                    >
                      <Download className="ms-2" size={24} />
                      احصل علي الكتاب الآن
                    </button>

                    <p className="small text-muted-custom">
                    </p>
                  </div>

                  {/* Right Column - Book Visual */}
                  <div className="col-md-6">
                    <div className="book-visual">
                      <div className="card card-custom p-4 shadow-lg" style={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', backdropFilter: 'blur(10px)' }}>
                        <div className="text-center">
                          <BookOpen className="text-primary-custom mx-auto mb-3" size={80} />
                          {/* <h3 className="fs-3 fw-bold mb-2">الحماية الجنائية</h3>
                          <h4 className="fs-4 fw-semibold text-primary-custom mb-3">لحقوق الإنسان</h4>
                          <p className="text-muted-custom mb-4">
                            دراسة مقارنة بأحكام ومبادئ الشريعة الإسلامية والمواثيق الدولية
                          </p>
                          <div className="border-top pt-3 mt-3" style={{ borderColor: 'rgba(198, 140, 55, 0.3) !important' }}>
                            <p className="fw-bold mb-1">د. خيري أحمد الكباش</p>
                            <p className="small text-muted-custom">قاضي ودكتور في القانون الجنائي</p>
                          </div> */}
                        </div>
                          <img className='img' src="/src/assets/8olaf.jpeg" alt="" />
                      </div>
                    </div>

                    {/* Floating Stats */}
                    <div className="position-absolute bg-primary-custom text-white rounded-circle d-flex align-items-center justify-content-center shadow-lg" 
                         style={{ top: '5px', left: '5px', width: '80px', height: '80px' }}>
                      <div className="text-center">
                        <p className="fs-4 fw-bold mb-0">200+</p>
                        <p className="small mb-0">صفحة</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EbookSectionBootstrap;
