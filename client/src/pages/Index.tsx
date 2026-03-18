import { useNavigate } from "react-router-dom";
import { LayoutDashboard, User, ChevronRight } from "lucide-react";
import AppLogo from "@/components/common/AppLogo";
import { useUserProfile } from "@/context/UserProfileContext";
import { SYSTEM_ROLES } from "@/types/role.types";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useUserProfile();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo + Brand */}
        <AppLogo />

        {/* Login options */}
        <div className="flex flex-col gap-4">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Continue {isAuthenticated ? 'to your dashboard' : 'as'}
          </p>

          {
            isAuthenticated ? (
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    return navigate(userInfo?.role.name === SYSTEM_ROLES.USER ? "/dashboard" : "/admin/dashboard");
                  }
                  return navigate("/login");
                }}
                className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 transition-colors group-hover:bg-secondary/20">
                  <LayoutDashboard className="h-6 w-6 text-secondary" strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">Dashboard</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {userInfo?.role.name === SYSTEM_ROLES.USER ? "Manage your todos & profile" : "Manage users, roles & permissions"}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-secondary" />
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ) : (
              <>
                {/* User login card */}
                <button
                  onClick={() => navigate("/login")}
                  className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <User className="h-6 w-6 text-primary" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">User Login</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Access your todos &amp; dashboard
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </button>

                {/* Admin login card */}
                <button
                  onClick={() => navigate("/admin/login")}
                  className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 transition-colors group-hover:bg-secondary/20">
                    <LayoutDashboard className="h-6 w-6 text-secondary" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">Admin Login</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Manage users, roles &amp; permissions
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-secondary" />
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </button>

              </>
            )
          }


        </div>

        {/* Register link */}
        {
          !isAuthenticated && (
            <p className="mt-8 text-center text-xs text-muted-foreground/60">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-none"
              >
                Register here
              </button>
            </p>
          )
        }

      </div>
    </div>
  );
};

export default Index;
