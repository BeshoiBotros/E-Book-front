import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./layouts/authLayout";
import UnAuthLayout from "./layouts/unAuthLayout";
import  Login  from "./pages/login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dashboard from "./pages/Dashboard";
import Book from "./pages/Book";
import Index from "./pages/Index";
import './styles/custom.css';

function App() {
  // // This is easily bypassed
  // document.addEventListener("contextmenu", (e) => e.preventDefault());

  // document.addEventListener("keydown", (e) => {
  //   // F12
  //   if (e.key === "F12") {
  //     e.preventDefault();
  //     return false;
  //   }

  //   // Ctrl+Shift+I / Ctrl+Shift+C / Ctrl+Shift+J
  //   if (
  //     (e.ctrlKey &&
  //       e.shiftKey &&
  //       (e.key === "I" || e.key === "C" || e.key === "J")) ||
  //     // Ctrl+U (view source)
  //     (e.ctrlKey && e.key === "U")
  //   ) {
  //     e.preventDefault();
  //     return false;
  //   }
  // });

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth Guard layout */}
          <Route element={<AuthLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* public pages */}
          <Route element={<UnAuthLayout />}>
            <Route path="/book" element={<Book />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
