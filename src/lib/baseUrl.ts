export const getBaseUrl = () => {
  // In Vercel: VERCEL_URL is like "myapp.vercel.app"
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // If you set NEXT_PUBLIC_SITE_URL in prod (e.g., https://mydomain.com)
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  // Local dev/build fallback
  return "http://localhost:3000";
};
