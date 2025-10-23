import { GraduationCap, Briefcase, Phone, Mail, MapPin } from "lucide-react";

const AboutBootstrap = () => {
  return (
    <section id="about" className="py-5 bg-gradient-primary">
      <div className="container py-5">
        {/* Section Header */}
        <div className="text-center mb-5 animate-slide-up">
          <h2 className="display-4 fw-bold mb-3">
            القاضي الدكتور{" "}
            <span className="text-primary-custom">خيري الكباش</span>
          </h2>
          <p
            className="fs-5 text-muted-custom mx-auto"
            style={{ maxWidth: "800px" }}
          >
            خبرة قضائية وأكاديمية استثنائية في القانون الجنائي وحقوق الإنسان
          </p>
        </div>

        {/* Personal Info Card */}
        <div className="card about-card mb-4 animate-slide-up">
          <div className="card-header bg-transparent border-0 pt-4">
            <h3 className="card-title fs-4 text-primary-custom d-flex align-items-center gap-3">
              <MapPin size={28} />
              البيانات الشخصية
            </h3>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-md-6">
                <p className="text-muted-custom mb-2">الاسم الكامل</p>
                <p className="fs-5 fw-semibold">
                  القاضي الدكتور / خيري أحمد عبدالمجيد الكباش
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-muted-custom mb-2">محل الميلاد</p>
                <p className="fs-5">محافظة البحيرة - جمهورية مصر العربية</p>
              </div>
              <div className="col-md-6">
                <p className="text-muted-custom mb-2">تاريخ الميلاد</p>
                <p className="fs-5">6 يناير 1953</p>
              </div>
              <div className="col-md-6">
                <p className="text-muted-custom mb-2">الحالة الاجتماعية</p>
                <p className="fs-5">متزوج وله ولدان</p>
              </div>
            </div>
            <div className="pt-4 mt-3 border-top">
              <p className="small text-muted-custom mb-3">الأبناء:</p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  • المستشار/ إسلام خيري الكباش: نائب رئيس مجلس الدولة بجمهورية
                  مصر العربية
                </li>
                <li>
                  • الدكتور/ محمد خيري الكباش: أستاذ الفيزياء (أبحاث
                  الإلكترونيات)، بجامعة أريزونا، الولايات المتحدة الأمريكية
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education Card */}
        <div className="card about-card mb-4 animate-slide-up">
          <div className="card-header bg-transparent border-0 pt-4">
            <h3 className="card-title fs-4 text-primary-custom d-flex align-items-center gap-3">
              <GraduationCap size={28} />
              المؤهلات العلمية
            </h3>
          </div>
          <div className="card-body">
            <ul className="list-unstyled">
              <li className="pb-4 mb-3 border-bottom">
                <p className="fw-bold fs-5 mb-2">
                  دكتوراه في القانون الجنائي وحقوق الإنسان
                </p>
                <p className="text-muted-custom">
                  كلية الحقوق جامعة الإسكندرية - 2001
                </p>
                <p className="small text-primary-custom mt-1">
                  تقدير: جيد جداً مع مرتبة الشرف وتبادل الرسالة مع الجامعات
                </p>
              </li>
              <li className="pb-4 mb-3 border-bottom">
                <p className="fw-bold fs-5 mb-2">دبلوم القانون الخاص</p>
                <p className="text-muted-custom">
                  كلية الحقوق جامعة الإسكندرية - 1980 (تقدير: جيد جداً)
                </p>
              </li>
              <li className="pb-4 mb-3 border-bottom">
                <p className="fw-bold fs-5 mb-2">دبلوم القانون العام</p>
                <p className="text-muted-custom">
                  كلية الحقوق جامعة الإسكندرية - 1983 (تقدير: جيد جداً)
                </p>
              </li>
              <li>
                <p className="fw-bold fs-5 mb-2">ليسانس حقوق</p>
                <p className="text-muted-custom">
                  كلية الحقوق جامعة الإسكندرية - 1979 (تقدير: جيد جداً)
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Experience Card */}
        <div className="card about-card mb-4 animate-slide-up">
          <div className="card-header bg-transparent border-0 pt-4">
            <h3 className="card-title fs-4 text-primary-custom d-flex align-items-center gap-3">
              <Briefcase size={28} />
              الخبرات العملية والوظيفية
            </h3>
          </div>
          <div className="card-body">
            <div className="info-section mb-4">
              <h4 className="fw-bold fs-5 mb-3 text-primary-custom">
                المناصب القضائية
              </h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  • تدرج في أعمال النيابة العامة ونيابات طنطا والإسكندرية
                </li>
                <li className="mb-2">
                  • رئيساً للنيابة ومفتشاً قضائياً بالنيابات
                </li>
                <li className="mb-2">
                  • قاضي جنائي جزئي ورئيس بمحاكم الجنح المستأنفة
                </li>
                <li className="mb-2">
                  • عضو ورئيس بدوائر الجنايات بمرسى مطروح والإسكندرية
                </li>
                <li className="mb-2">
                  • رئيس نيابة بنيابة العاصمة بالكويت (1998-2004)
                </li>
                <li className="mb-2">
                  • رئيس الدائرة الجزائية الاستئنافية بأبو ظبي (2010-2015)
                </li>
                <li>• رئيس بمحكمة استئناف القاهرة والإسكندرية</li>
              </ul>
            </div>

            <div className="info-section mb-4">
              <h4 className="fw-bold fs-5 mb-3 text-primary-custom">
                المناصب الأكاديمية والإدارية
              </h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  • الأمين العام للجنة العُليا للإصلاح التشريعي (سابقاً)
                </li>
                <li className="mb-2">
                  • عضو مجلس إدارة الجمعية المصرية للقانون الجنائي
                </li>
                <li className="mb-2">
                  • الأمين العام للجمعية المصرية للطب والقانون
                </li>
                <li className="mb-2">
                  • رئيس لجنة السياسات والتشريعات بالاتحاد العربي للاقتصاد
                  الرقمي
                </li>
                <li className="mb-2">
                  • أستاذ محاضر بكلية الحقوق جامعة الإسكندرية
                </li>
                <li>
                  • عضو الهيئة العلمية بأكاديمية الدراسات القضائية - أبو ظبي
                  (سابقاً)
                </li>
              </ul>
            </div>

            <div className="info-section">
              <h4 className="fw-bold fs-5 mb-3 text-primary-custom">
                الإنجازات الأكاديمية
              </h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  • أكثر من 100 بحث ودراسة قانونية منشورة
                </li>
                <li className="mb-2">
                  • مؤلف عدة كتب متخصصة في القانون الجنائي وحقوق الإنسان
                </li>
                <li className="mb-2">
                  • المشاركة في لجان الحكم والمناقشة لرسائل الدكتوراه والماجستير
                </li>
                <li>• عضو هيئة تحرير مجلات قانونية متخصصة</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div id="contact" className="card about-card animate-slide-up">
          <div className="card-header bg-transparent border-0 pt-4">
            <h3 className="card-title fs-4 text-primary-custom">
              معلومات الاتصال
            </h3>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex align-items-start gap-3">
                  <Phone className="text-primary-custom mt-1" size={24} />
                  <div>
                    <p className="fw-semibold mb-2">الهاتف</p>
                    <p className="text-muted-custom mb-1">
                      مصر: 00201112019430
                    </p>
                    <p className="text-muted-custom mb-1">مصر: 002034492643</p>
                    <p className="text-muted-custom mb-0">
                      السعودية: 00966557516323
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start gap-3">
                  <Mail className="text-primary-custom mt-1" size={24} />
                  <div>
                    <p className="fw-semibold mb-2">البريد الإلكتروني</p>
                    <a
                      href="mailto:drkhairy4@gmail.com"
                      className="text-primary-custom text-decoration-none"
                    >
                      drkhairy4@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex align-items-start gap-3">
                  <MapPin className="text-primary-custom mt-1" size={24} />
                  <div>
                    <p className="fw-semibold mb-2">العنوان</p>
                    <p className="text-muted-custom mb-0">
                      فيلا ثمرة الإخلاص، شارع المستشار الدكتور خيري الكباش، خلف
                      المعاهد العليا كينج مريوط الإسكندرية
                    </p>
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

export default AboutBootstrap;
