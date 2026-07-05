import { Link } from "react-router-dom";
import logo from "../image/logo.png"

const year = new Date().getFullYear();

const Footer = () => (
  <footer className="border-t border-slate-800 bg-charcoal mt-24">
    <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
      <div>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-electric/15 border border-electric/40 flex items-center justify-center">
            <img src={logo} alt="logo"/>
          </div>
          <span className="text-lg font-semibold text-white">
            Stack<span className="text-electric">Nova</span>
          </span>
        </Link>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          Full-stack developer, UI/UX designer, and instructor building
          practical, production-ready web apps.
        </p>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Explore</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li><Link to="/about" className="hover:text-electric transition-colors">About</Link></li>
          <li><Link to="/benefits" className="hover:text-electric transition-colors">Benefits</Link></li>
          <li><Link to="/blog" className="hover:text-electric transition-colors">Blog</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Account</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li><Link to="/profile" className="hover:text-electric transition-colors">Profile</Link></li>
          <li><Link to="/login" className="hover:text-electric transition-colors">Login</Link></li>
          <li><Link to="/register" className="hover:text-electric transition-colors">Register</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Get in touch</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li><Link to="/contact" className="hover:text-electric transition-colors">Contact form</Link></li>
          <li>Erbil, Iraqi Kurdistan</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <span>© {year} Stack Nova. All rights reserved.</span>
        <span>Built with React, Tailwind CSS &amp; Express.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
