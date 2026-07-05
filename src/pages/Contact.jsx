import { useState } from "react";
import api from "../api/axios";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await api.post("/contact", form);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "mt-1 w-full rounded-md bg-navy border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-electric transition-shadow";

  return (
    <section className="max-w-xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold text-white mb-2">Get in touch</h1>
      <p className="text-slate-400 mb-8 text-sm">
        Have a project, a question, or want to collaborate? Send a message below.
      </p>

      {sent ? (
        <p className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-md px-4 py-3">
          Thanks for reaching out — I'll get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 bg-charcoal border border-slate-800 rounded-xl p-8">
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-slate-400">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="text-sm text-slate-400">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-slate-400">Phone number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+964 xxx xxx xxxx"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-slate-400">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="City, Country"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-400">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={4} className={inputClass} placeholder="course , project ......." />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-md bg-electric py-2.5 font-medium text-white hover:bg-electric/90 hover:shadow-lg hover:shadow-electric/20 transition-all disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send message"}
          </button>
        </form>
      )}
    </section>
  );
};

export default Contact;
