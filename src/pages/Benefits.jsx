const benefits = [
  { title: "Secure by default", desc: "Passwords hashed with bcryptjs, sessions handled via httpOnly JWT cookies." },
  { title: "Full-stack ready", desc: "React + Tailwind frontend paired with an Express + MongoDB backend." },
  { title: "Teachable structure", desc: "Clear folder structure and separation of concerns, easy to explain in a course." },
  { title: "Extensible", desc: "Add blog posts, roles, or payments on top of the existing auth foundation." },
];

const Benefits = () => (
  <section className="max-w-5xl mx-auto px-6 py-20">
    <h1 className="text-3xl font-semibold text-white mb-10 text-center">Benefits</h1>
    <div className="grid sm:grid-cols-2 gap-6">
      {benefits.map((b) => (
        <div key={b.title} className="bg-charcoal border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-medium text-electric mb-2">{b.title}</h3>
          <p className="text-slate-400 text-sm">{b.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Benefits;
