const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://bedstats-site.vercel.app";

export default baseUrl;
