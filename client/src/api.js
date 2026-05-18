const API_BASE_URL = import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD ? "https://my-project-30p7.onrender.com" : "http://localhost:5000");

export const apiUrl = (path) => API_BASE_URL + path;
