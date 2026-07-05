import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { resolveAvatarUrl } from "../api/axios";

const courses = [
  { title: "Full-Stack Web Development", level: "Beginner → Advanced", students: 120 },
  { title: "MERN Authentication Deep Dive", level: "Intermediate", students: 64 },
  { title: "React & Tailwind UI Design", level: "Beginner", students: 89 },
];

const Avatar = ({ user, size = 96 }) => {
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const src = resolveAvatarUrl(user?.avatar);

  if (src) {
    return (
      <img
        src={src}
        alt={user.name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover border-2 border-electric/50"
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-electric/20 border-2 border-electric/50 text-electric flex items-center justify-center text-2xl font-semibold"
    >
      {initials || "?"}
    </div>
  );
};

const Profile = () => {
  const { user, updateProfile, uploadAvatar, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB");
      return;
    }

    setError("");
    setUploading(true);
    try {
      await uploadAvatar(file);
      setMessage("Photo updated");
    } catch (err) {
      setError(err.response?.data?.message || "Photo upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);
    try {
      const updates = { name: form.name, bio: form.bio };
      if (form.password) updates.password = form.password;
      await updateProfile(updates);
      setMessage("Profile updated successfully");
      setForm({ ...form, password: "" });
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({ name: user?.name || "", bio: user?.bio || "", password: "" });
    setError("");
    setEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      {message && (
        <p className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-md px-3 py-2">
          {message}
        </p>
      )}
      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {/* Profile card */}
      <div className="bg-charcoal border border-slate-800 rounded-xl p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="relative group shrink-0 w-fit">
            <Avatar user={user} />
            <button
              type="button"
              onClick={handlePhotoClick}
              disabled={uploading}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 group-hover:bg-black/50 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-all"
            >
              {uploading ? "Uploading..." : "Change photo"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/gif"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {!editing ? (
            <>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-white">{user?.name}</h1>
                <p className="text-slate-400 text-sm">{user?.email}</p>
                <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                  {user?.bio || "No bio yet — tell people a bit about yourself."}
                </p>
              </div>
              <div className="flex sm:flex-col gap-3">
                <button
                  onClick={() => setEditing(true)}
                  className="rounded-md bg-electric px-5 py-2 text-sm font-medium text-white hover:bg-electric/90 transition-colors"
                >
                  Edit profile
                </button>
                <button
                  onClick={logout}
                  className="rounded-md border border-slate-700 px-5 py-2 text-sm font-medium text-slate-300 hover:border-red-500/50 hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="flex-1 space-y-5">
              <div>
                <label className="text-sm text-slate-400">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md bg-navy border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-electric"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400">Bio</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={3}
                  maxLength={300}
                  className="mt-1 w-full rounded-md bg-navy border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-electric"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400">New password (optional)</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                  className="mt-1 w-full rounded-md bg-navy border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-electric"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-electric px-5 py-2 font-medium text-white hover:bg-electric/90 transition-colors disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-md border border-slate-700 px-5 py-2 font-medium text-slate-300 hover:border-slate-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Courses section */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">My courses</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {courses.map((c) => (
            <div
              key={c.title}
              className="bg-charcoal border border-slate-800 rounded-xl p-5 hover:border-electric/50 transition-colors"
            >
              <h3 className="text-slate-100 font-medium">{c.title}</h3>
              <p className="text-xs text-electric mt-1">{c.level}</p>
              <p className="text-xs text-slate-500 mt-3">{c.students} students enrolled</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
