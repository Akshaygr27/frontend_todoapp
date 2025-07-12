import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import TodoPage from './pages/TodoPage';
import { useAuth } from './context/AuthContext';

function AppRoutes() {
  const { token } = useAuth();
  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/todos" /> : <AuthPage />} />
      <Route path="/todos" element={token ? <TodoPage /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    
      <AppRoutes />
   
  );
}