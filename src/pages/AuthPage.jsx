import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser, signupUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import ToastMessage from "../components/ToastMessage";

export default function AuthPage() {
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });

  const showToast = (message, variant = "success") =>
    setToast({ show: true, message, variant });

  const hideToast = () => setToast({ ...toast, show: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    try {
      if (isSignup) {
        if (form.password !== form.confirmPassword) {
          setErrorMsg("Passwords do not match");
          return;
        }
        const res = await signupUser(form);
        showToast(res.data.message || "Signup successful!", "success");
        setIsSignup(false);
        setForm({ email: "", username: "", password: "", confirmPassword: "" });
      } else {
        const res = await loginUser(form);
        login(res.data.token);
      }
    } catch (err) {
      const apiError = err.response?.data;
      setErrorMsg(
        apiError?.message ||
          apiError?.errors?.[0]?.msg ||
          "Something went wrong"
      );
    }
  };

  const clearCurrentStates = () => {
    setIsSignup(!isSignup);
    setErrorMsg("");
    setSuccessMsg("");
    setForm({ email: "", username: "", password: "", confirmPassword: "" });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4">{isSignup ? "Signup" : "Login"}</h3>
        <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          {successMsg && (
            <div className="alert alert-success">{successMsg}</div>
          )}
          {isSignup && (
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          {isSignup && (
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
              />
            </div>
          )}
          <button className="btn btn-dark w-100 mb-3">
            {isSignup ? "Signup" : "Login"}
          </button>
          <p className="text-center">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            &nbsp;
            <span
              className="text-dark"
              style={{ cursor: "pointer" }}
              onClick={clearCurrentStates}
            >
              <u>{isSignup ? "Login" : "Signup"}</u>
            </span>
          </p>
        </form>
      </div>
      <ToastMessage
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={hideToast}
      />
    </>
  );
}
