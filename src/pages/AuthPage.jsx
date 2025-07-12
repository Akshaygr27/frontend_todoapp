import { useState } from 'react';
import { loginUser, signupUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function AuthPage() {
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ email: '', username: '', password: '', confirm: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        if (form.password !== form.confirm) return alert('Passwords do not match');
        await signupUser(form);
        alert('Signup successful! Please log in.');
        setIsSignup(false);
      } else {
        const res = await loginUser(form);
        login(res.data.token);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  };

  return (
    <>
    <Navbar />
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-4">{isSignup ? 'Signup' : 'Login'}</h3>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        {isSignup && (
          <input type="text" className="form-control mb-3" placeholder="Username"
            value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
        )}
        <input type="email" className="form-control mb-3" placeholder="Email"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" className="form-control mb-3" placeholder="Password"
          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        {isSignup && (
          <input type="password" className="form-control mb-3" placeholder="Confirm Password"
            value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} required />
        )}
        <button className="btn btn-primary w-100 mb-3">{isSignup ? 'Signup' : 'Login'}</button>
        <p className="text-center">
          {isSignup ? 'Already have an account?' : 'Don\'t have an account?'}&nbsp;
          <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Login' : 'Signup'}
          </span>
        </p>
      </form>
    </div>
    </>
  );
}
