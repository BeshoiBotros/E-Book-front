import type React from "react";
import { loginUser, type LoginData, type TokenResponse } from "../api/auth";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router";
import "../styles/login.css";
import logo from "../assets/hummer2.svg";
import HeaderBootstrap from "../components/HeaderBootstrap";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginData>({ username: "", password: "" });

  if (Cookies.get("access")) {
    return <Navigate to="/dashboard" />;
  }

  const mutation = useMutation<TokenResponse, Error, LoginData>({
    mutationFn: loginUser,
    onMutate: () => {
      Swal.fire({
        title: "Loging in...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },
    onSuccess: (data) => {
      Cookies.set("access", data.access, { expires: 7 });
      Swal.fire({
        icon: "success",
        title: "Login Successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    },
  });

  const handChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <>
      <HeaderBootstrap />
      <div className="login-page-container container-fluid d-flex align-items-center justify-content-center min-vh-100">
        <div className="login-form-card p-4 rounded shadow-lg col-12 col-md-8 col-lg-5">
          <h2 className="text-center mb-4">تسجيل الدخول</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                اسم المستخدم
              </label>
              <input
                type="text"
                name="username"
                className="form-control"
                id="username"
                placeholder="ادخل اسم المستخدم"
                onChange={handChange}
                value={form.username}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                كلمة المرور
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                placeholder="ادخل كلمة المرور"
                onChange={handChange}
                value={form.password}
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkMeOut"
              />
              <label className="form-check-label" htmlFor="checkMeOut">
                تذكرني
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
