import axios from 'axios';

// In dev, requests go through Vite's proxy (/api → localhost:4000).
// In prod, the API is co-located on the same domain.
export default axios.create({
  baseURL: '',
  withCredentials: true,
});
