const API =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:5000/api"
    : "https://student-registration-portal-ark8.onrender.com//api";