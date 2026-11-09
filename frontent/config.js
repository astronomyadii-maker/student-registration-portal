const API =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:5000/api"
    : "https://YOUR-BACKEND-NAME.onrender.com/api";