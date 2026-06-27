import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Login from './Login';
import { LogOut, User } from 'lucide-react';

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
      setLoading(false);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleLoginSuccess = () => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };
    checkSession();
  };

  const getInitial = (email) => {
    return email ? email[0].toUpperCase() : '?';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Verificando acceso...</p>
      </div>
    );
  }

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="private-route-wrapper">
      <div className="admin-session-bar">
        <div className="session-info">
          <span className="session-avatar">{getInitial(user.email)}</span>
          <span className="session-email">{user.email}</span>
        </div>
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={16} />
          Cerrar Sesión
        </button>
      </div>
      {children}
    </div>
  );
}
