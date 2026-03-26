
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AppLogo from "@/components/common/AppLogo";


const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-secondary/10 blur-3xl animate-pulse delay-200" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <AppLogo onlyLogo />
        {/* SVG illustration for empty/task not found */}
        <svg width="180" height="180" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2 animate-float">
          <circle cx="60" cy="60" r="56" fill="#F4F4F5" />
          <rect x="35" y="45" width="50" height="30" rx="6" fill="#E0E7FF" />
          <rect x="42" y="53" width="36" height="6" rx="3" fill="#6366F1" />
          <rect x="42" y="63" width="24" height="4" rx="2" fill="#A5B4FC" />
          <rect x="70" y="63" width="8" height="4" rx="2" fill="#C7D2FE" />
          <path d="M50 80c0 2.21 8 4 10 4s10-1.79 10-4" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
          <text x="60" y="40" textAnchor="middle" fontSize="24" fill="#6366F1" fontWeight="bold">404</text>
        </svg>
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground">Page Not Found</h1>
        <p className="mb-4 max-w-md text-lg text-muted-foreground">
          Oops! The page you&apos;re looking for doesn&apos;t exist.<br />
          Maybe you want to get back to your tasks?
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-base font-semibold text-white shadow transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
