const posts = [
  { title: "Why JWT + httpOnly cookies beat localStorage", tag: "Security" },
  { title: "Structuring an Express API for a course project", tag: "Backend" },
  { title: "Designing a dark developer-portfolio UI in Tailwind", tag: "Design" },
];

const Blog = () => (
  <section className="max-w-4xl mx-auto px-6 py-20">
    <h1 className="text-3xl font-semibold text-white mb-10">Blog</h1>
    <div className="space-y-4">
      {posts.map((p) => (
        <article key={p.title} className="bg-charcoal border border-slate-800 rounded-xl p-6 hover:border-electric/50 transition-colors">
          <span className="text-xs uppercase tracking-wide text-electric">{p.tag}</span>
          <h2 className="text-lg font-medium text-white mt-1">{p.title}</h2>
        </article>
      ))}
    </div>
  </section>
);

export default Blog;
