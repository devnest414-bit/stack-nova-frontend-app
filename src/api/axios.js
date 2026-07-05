import axios from 'axios';

export const API_ORIGIN = import.meta.env.VITE_API_URL;
// export const API_ORIGIN = "http://localhost:5000";
 
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true, // sends the httpOnly JWT cookie automatically
});

// Turns a stored avatar path like "/uploads/abc.jpg" into a full URL.
// Leaves full URLs (http://...) untouched.
export const resolveAvatarUrl = (avatar) => {
  if (!avatar) return '';
  if (avatar.startsWith('http')) return avatar;
  return `${API_ORIGIN}${avatar}`;
};

export default api;
