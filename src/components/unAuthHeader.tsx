import { Link } from "react-router";

import "../styles/unAuthHeader.css";

const UnAuthLayout = () => {
  return (
    <>
      <div className="un-auth-header">
        <header className="col-12 container">
          <a href="#" className="logo">
            لوجو الموقع
          </a>
          <nav>
            <Link to="/"> الرئيسية </Link>
            <Link to="/login"> تسجيل الدخول </Link>
          </nav>
        </header>
      </div>
    </>
  );
};

export default UnAuthLayout;
