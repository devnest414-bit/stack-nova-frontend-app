import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-charcoal border border-slate-800 rounded-xl p-8 space-y-5"
      >
        <h1 className="text-2xl font-semibold text-white">Create account</h1>

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <div>
          <label className="text-sm text-slate-400">Full name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md bg-navy border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-electric"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md bg-navy border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-electric"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="mt-1 w-full rounded-md bg-navy border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-electric"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-electric py-2 font-medium text-white hover:bg-electric/90 transition-colors disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm text-slate-400 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-electric hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
