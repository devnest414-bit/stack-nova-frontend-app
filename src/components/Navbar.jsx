import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { resolveAvatarUrl } from '../api/axios';
import logo from '../image/logo.png'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/benefits', label: 'Benefits' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
  { to: '/course', label: 'Course' },
];

const NavLink = ({ to, label }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors py-1"
    >
      {label}
      <motion.span
        className="absolute left-0 -bottom-0.5 h-[2px] bg-electric rounded-full"
        initial={false}
        animate={{ width: active ? '100%' : 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
};

const Avatar = ({ user, size = 32 }) => {
  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const src = resolveAvatarUrl(user?.avatar);
  if (src) {
    return (
      <img
        src={src}
        alt={user.name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover border border-slate-700"
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-electric/20 border border-electric/40 text-electric flex items-center justify-center text-xs font-semibold"
    >
      {initials || '?'}
    </div>
  );
};

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 group">
    <motion.div
      whileHover={{ rotate: -8, scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 300, damping: 12 }}
      className="w-8 h-8 rounded-lg overflow-hidden bg-electric/15 border border-electric/40 flex items-center justify-center"
    >
      <img src={logo} alt="Logo" className="w-full h-full object-contain" />
    </motion.div>

    <span className="text-lg font-semibold text-white tracking-tight">
      Stack<span className="text-electric">Nova</span>
    </span>
  </Link>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-charcoal/80 backdrop-blur border-b border-slate-800">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Logo />

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <NavLink key={l.to} {...l} />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 group">
                <Avatar user={user} />
                <span className="text-sm font-medium text-slate-200 group-hover:text-electric transition-colors">
                  {user.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md bg-electric/10 border border-electric/40 px-3 py-1.5 text-sm text-electric hover:bg-electric/20 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-300 hover:text-electric transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-electric px-3 py-1.5 text-sm font-medium text-white hover:bg-electric/90 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-slate-300"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 7H20M4 12H20M4 17H20"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-slate-800 bg-charcoal"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-sm text-slate-300 hover:text-electric transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <div className="h-px bg-slate-800 my-2" />
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="py-2 text-sm text-slate-300"
                  >
                    {user.name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="py-2 text-left text-sm text-electric"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="py-2 text-sm text-slate-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="py-2 text-sm text-electric"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
